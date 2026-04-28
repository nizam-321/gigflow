//path: backend/src/controllers/bid.controller.ts
import { Request, Response } from "express";
import Bid from "../models/Bid";
import Gig from "../models/Gig";
import Notification from "../models/Notification";
import mongoose from "mongoose";
import { io } from "../server";

/**
 * @desc    Submit a bid for a gig
 * @route   POST /api/bids
 * @access  Private (Freelancer)
 */
export const createBid = async (req: any, res: Response) => {
  try {
    const { gigId, message, amount } = req.body;

    if (!gigId || !message || amount === undefined) {
      return res.status(400).json({ message: "Gig ID, message and amount are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status !== "open") {
      return res.status(400).json({ message: "This gig is no longer open" });
    }

    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot bid on your own gig" });
    }

    const existingBid = await Bid.findOne({ gigId, freelancerId: req.user._id });
    if (existingBid) {
      return res.status(400).json({ message: "You have already bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      amount,
    });

    return res.status(201).json({
      message: "Bid submitted successfully",
      bid,
    });
  } catch (error) {
    console.error("Create Bid Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all bids for a specific gig (Owner only)
 * @route   GET /api/bids/:gigId
 * @access  Private (Gig Owner)
 */
export const getBidsForGig = async (req: any, res: Response) => {
  try {
    const { gigId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to view these bids" });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error) {
    console.error("Get Bids Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all bids placed by the logged-in freelancer
 * @route   GET /api/bids/my
 * @access  Private
 */
export const getMyBids = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const bids = await Bid.find({ freelancerId: req.user._id })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: bids.length,
      bids,
    });
  } catch (error) {
    console.error("Get My Bids Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Hire a freelancer for a gig (Owner only) - Transaction Safe
 * @route   PATCH /api/bids/:bidId/hire
 * @access  Private (Gig Owner)
 */
export const hireBid = async (req: any, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    if (!req.user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({ message: "Not authorized" });
    }

    const selectedBid = await Bid.findById(bidId).session(session);
    if (!selectedBid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(selectedBid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: "You are not allowed to hire for this gig" });
    }

    if (gig.status !== "open") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "This gig has already been assigned" });
    }

    selectedBid.status = "hired";
    await selectedBid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: selectedBid._id } },
      { $set: { status: "rejected" } },
      { session }
    );

    gig.status = "assigned";
    await gig.save({ session });

    await session.commitTransaction();
    session.endSession();

    const freelancerId = selectedBid.freelancerId.toString();

    // Persist notification in DB
    await Notification.create({
      userId: selectedBid.freelancerId,
      message: `🎉 You have been hired for: ${gig.title}`,
      gigId: gig._id,
    });

    // Emit real-time notification
    io.to(freelancerId).emit("notification", {
      message: `🎉 You have been hired for: ${gig.title}`,
      gigId: gig._id,
    });

    return res.status(200).json({
      message: "Freelancer hired successfully",
      hiredBid: selectedBid,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Hire Bid Transaction Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

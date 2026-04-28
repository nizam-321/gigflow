//path: backend/src/controllers/gig.controller.ts
import { Request, Response } from "express";
import Gig from "../models/Gig";

/**
 * @desc    Create a new Gig (Job)
 * @route   POST /api/gigs
 * @access  Private
 */
export const createGig = async (req: any, res: Response) => {
  try {
    const { title, description, budget, category, skills, deadline } = req.body;

    if (!title || !description || budget === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      category,
      skills,
      deadline: deadline ? new Date(deadline) : undefined,
      ownerId: req.user._id,
    });

    return res.status(201).json({
      message: "Gig created successfully",
      gig,
    });
  } catch (error) {
    console.error("Create Gig Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get all open gigs (with optional search by title)
 * @route   GET /api/gigs
 * @access  Public
 */
export const getOpenGigs = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const filter: any = { status: "open" };

    if (search) {
      filter.title = { $regex: search as string, $options: "i" };
    }

    const gigs = await Gig.find(filter)
      .populate("ownerId", "name")
      .sort({ createdAt: -1 });

    // Map to include postedByName for frontend
    const gigsWithOwner = gigs.map((gig: any) => ({
      _id: gig._id,
      title: gig.title,
      description: gig.description,
      budget: gig.budget,
      category: gig.category,
      skills: gig.skills,
      deadline: gig.deadline,
      status: gig.status,
      createdAt: gig.createdAt,
      postedByName: gig.ownerId?.name || "Unknown",
      ownerId: gig.ownerId?._id,
    }));

    return res.status(200).json({
      count: gigsWithOwner.length,
      gigs: gigsWithOwner,
    });
  } catch (error) {
    console.error("Get Gigs Error:", error);
    return res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

/**
 * @desc    Get gigs posted by the logged-in user
 * @route   GET /api/gigs/my
 * @access  Private
 */
export const getMyGigs = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const gigs = await Gig.find({ ownerId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    console.error("Get My Gigs Error:", error);
    return res.status(500).json({ message: "Failed to fetch your gigs" });
  }
};

/**
 * @desc    Get single gig by ID
 * @route   GET /api/gigs/:id
 * @access  Public
 */
export const getGigById = async (req: any, res: any) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("ownerId", "name");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    const gigData = {
      _id: gig._id,
      title: gig.title,
      description: gig.description,
      budget: gig.budget,
      category: gig.category,
      skills: gig.skills,
      deadline: gig.deadline,
      status: gig.status,
      createdAt: (gig as any).createdAt,
      postedByName: (gig.ownerId as any)?.name || "Unknown",
      ownerId: (gig.ownerId as any)?._id,
    };

    res.status(200).json({ gig: gigData });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};

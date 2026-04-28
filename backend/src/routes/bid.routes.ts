//path: backend/src/routes/bid.routes.ts
import { Router } from "express";
import { createBid, getBidsForGig, getMyBids, hireBid } from "../controllers/bid.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// Get bids placed by logged-in freelancer - must be before /:gigId
router.get("/my", protect, getMyBids);

// Get Bids for a Gig (Owner only)
router.get("/:gigId", protect, getBidsForGig);

// Hire a freelancer for a bid (Owner only)
router.patch("/:bidId/hire", protect, hireBid);

// Submit Bid (Protected)
router.post("/", protect, createBid);

export default router;

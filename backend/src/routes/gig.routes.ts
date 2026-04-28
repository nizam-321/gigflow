//path: backend/src/routes/gig.routes.ts
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createGig, getOpenGigs, getGigById, getMyGigs } from "../controllers/gig.controller";

const router = Router();

// Get Gigs posted by logged-in user (Protected) - must be before /:id
router.get("/my", protect, getMyGigs);

// Get All Open Gigs (Public)
router.get("/", getOpenGigs);

// Get single gig by Id (Public)
router.get("/:id", getGigById);

// Create Gig (Protected)
router.post("/", protect, createGig);

export default router;

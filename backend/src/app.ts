//path: backend/src/app.ts
import express from "express";
import { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import gigRoutes from "./routes/gig.routes";
import bidRoutes from "./routes/bid.routes";
import notificationRoutes from "./routes/notification.routes";

const app: Application = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

//CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

//Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/notifications", notificationRoutes);

//health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("GigFlow API is running...");
});

export default app;

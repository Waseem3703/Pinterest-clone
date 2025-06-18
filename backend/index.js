// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

import connectDb from "./database/db.js";
import UserRoutes from "./routes/userRoutes.js";
import PinRoutes from "./routes/PinRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";

dotenv.config();

/* ────── EXPRESS APP ────── */
const app = express();

/* ────── MIDDLEWARE ────── */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/* ────── CLOUDINARY ────── */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* ────── ROUTES ────── */
app.use("/api/user", UserRoutes);
app.use("/api/pin", PinRoutes);
app.use("/api", AdminRoutes);

/* ────── SERVE FRONTEND BUILD ────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));
app.get("*", (_, res) => res.sendFile(path.join(distPath, "index.html")));

/* ────── START SERVER FIRST ────── */
const PORT = process.env.PORT || 5000;   // Render supplies PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀  Server listening on 0.0.0.0:${PORT}`);
});

/* ────── THEN CONNECT TO MONGODB ────── */
(async () => {
  try {
    await connectDb();           // no top‑level await
    console.log("✅  MongoDB connected");
  } catch (err) {
    console.error("❌  MongoDB connection failed:", err.message);
    // keep the server alive so you can still hit health routes / logs
  }
})();

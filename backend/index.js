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

const app = express();

/* ─────────────── CORS ─────────────── */
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

/* ─────────────── MIDDLEWARES ─────────────── */
app.use(express.json());
app.use(cookieParser());

/* ─────────────── CLOUDINARY ─────────────── */
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* ─────────────── API ROUTES ─────────────── */
app.use("/api/user", UserRoutes);
app.use("/api/pin", PinRoutes);
app.use("/api", AdminRoutes);

/* ─────────────── SERVE FRONTEND BUILD ─────────────── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));

app.get("*", (_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* ─────────────── START SERVER ─────────────── */
const PORT = process.env.PORT || 5000;

try {
  await connectDb();             // ensure MongoDB is up first
  app.listen(PORT, () =>
    console.log(`🚀  Server running on port ${PORT}`)
  );
} catch (err) {
  console.error("❌  MongoDB connection failed:", err);
  process.exit(1);
}

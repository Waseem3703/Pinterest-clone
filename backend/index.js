import express from "express";
import connectDb from "./database/db.js";
import UserRoutes from "./routes/userRoutes.js";
import PinRoutes from "./routes/PinRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";

// ✅ Load environment variables first
dotenv.config();

// ✅ Initialize express app before using it
const app = express();

// ✅ CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Other middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_NAME,
  api_key: process.env.Cloudinary_API,
  api_secret: process.env.Cloudinary_SECRET,
});

// ✅ Use routes
app.use("/api/user", UserRoutes);
app.use("/api/pin", PinRoutes);

// ✅ Start server
const port = 5000;
app.listen(port, () => {
  console.log(`The app is working on port ${port}`);
  connectDb(); // connect to MongoDB
});

import express from "express";
import connectDb from "./database/db.js";
import UserRoutes from "./routes/userRoutes.js";
import PinRoutes from "./routes/PinRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";
import path from "path"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_NAME,
  api_key: process.env.Cloudinary_API,
  api_secret: process.env.Cloudinary_SECRET,
});

app.use("/api/user", UserRoutes);
app.use("/api/pin", PinRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html" ))

})

const port = 5000;
app.listen(port, () => {
  console.log(`The app is working on port ${port}`);
  connectDb(); // connect to MongoDB
});

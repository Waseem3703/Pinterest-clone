import express from "express";
import connectDb from "./database/db.js";
import  UserRoutes  from "./routes/userRoutes.js"
import PinRoutes from "./routes/PinRoutes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";


const app = express();

cloudinary.v2.config({
    cloud_name: process.env.Cloudinary_NAME,
    api_key: process.env.Cloudinary_API,
    api_secret: process.env.Cloudinary_SECRET,
})
dotenv.config();

const port = 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//importing routes from the routes file


app.use("/api/user", UserRoutes);
app.use("/api/pin", PinRoutes);


app.listen(port, () => {
    console.log(`The app is working on port ${port}`)
    connectDb();
});

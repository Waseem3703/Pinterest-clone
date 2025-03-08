import express from "express";
import isAuth from "../middleware/isAuth.js";
import UploadFile from "../middleware/multer.js";
import { CreatePin } from "../controllers/PinControllers.js";

const router = express.Router();


router.post("/new", isAuth, UploadFile, CreatePin)

export default router;

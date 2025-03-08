import express from "express";
import isAuth from "../middleware/isAuth.js";
import UploadFile from "../middleware/multer.js";
import { 
    commentOnPin, CreatePin, DeleteComment, deletePin, getAllPins, getSinglePin,
    UpdatePin
 } from "../controllers/PinControllers.js";

const router = express.Router();


router.post("/new", isAuth, UploadFile, CreatePin);
router.get("/all", isAuth, getAllPins);
router.get("/:id", isAuth, getSinglePin);
router.delete("/:id", isAuth, deletePin);
router.put("/:id", isAuth, UpdatePin);
router.post("/comment/:id", isAuth, commentOnPin);
router.delete("/comment/:id", isAuth, DeleteComment);


export default router;

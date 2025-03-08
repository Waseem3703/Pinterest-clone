import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/UrlGenerator.js";
import cloudinary from "cloudinary";
import {Pin} from "../models/CreatePin.js"

export const CreatePin = TryCatch(async (req, res) => {
    const { title, pin } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = getDataUrl(req.file); // Convert buffer to base64

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Pin.create({
        title,
        pin,
        image: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
        owner: req.user._id,
    });

    res.json({ message: "Pin Created" });
});

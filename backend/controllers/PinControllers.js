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


export const getAllPins = TryCatch(async(req, res)=>{
    const pins = await Pin.find().sort({ createdAt : -1 });
    
    res.json(pins);
});

export const getSinglePin = TryCatch(async(req, res)=>{
    const pin = await Pin.findById(req.params.id).populate("owner", "-password");
    
    res.json(pin);
});

export const commentOnPin = TryCatch(async(req, res)=>{
    const pin = await Pin.findById(req.params.id);
    
    if(!pin){  
        return res.json({
        message: "No pin with this id",
    
    });
};

    pin.comments.push({
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,

    });
    
    await pin.save()

    res.json({
        message: "Comment Added Sucessfuly",
    });
});


export const DeleteComment = TryCatch(async(req, res) =>{

    const pin = await Pin.findById(req.params.id);

    if(!pin){
        return res.status(400).json({
            message: "No pin with this id",
        });
    };
    if(!req.query.commentId){
        return res.status(404).json({
            message: "Please Provide comment id",
        });
    };

    const CommentIndex = pin.comments.findIndex(
        (item) => item._id.toString() == req.query.commentId.toString()
    );
    if(!CommentIndex === -1){
        return res.status(404).json({
        message: "No Commment with this id",
    });
    };

    const comment = pin.comments[CommentIndex];
    
    if(comment.user.toString() === req.user._id.toString()){
        pin.comments.splice(CommentIndex, 1);
     
        await pin.save();

        return res.json({
            message: "Comment Deleted Succesfully",
        });
    }
    else{
        return res.status(403).json({
            message: "You are not owner of this comment",
        });
    };
        
});


export const deletePin = TryCatch(async(req, res)=>{
    const pin = await Pin.findById(req.params.id)

    if (!pin)
        return res.status(400).json({
        message: "No pin with this id",
    
    });

    if(pin.owner.toString() !== req.user._id.toString())
        return res.status(403).json({
    message: "Unauthorized",
});
    
    await cloudinary.v2.uploader.destroy(pin.image.id)

    await pin.deleteOne();

    res.json({
        message: "Pin Deleted Successfuly",
    });


});


export const UpdatePin = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin)
        return res.status(400).json({
            message: "No pin with this id",
        });

    if (pin.owner.toString() !== req.user._id.toString())
        return res.status(403).json({
            message: "Unauthorized",
        });

    // Update the pin's title and description
    pin.title = req.body.title;
    pin.pin = req.body.pin;

    // Save the updated pin
    await pin.save();

    res.json({
        message: "Pin Updated Successfully",
    });
});

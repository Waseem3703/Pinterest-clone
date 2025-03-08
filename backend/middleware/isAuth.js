import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

const isAuth = async(req, res, next)=>{
    try {
        
        const token = req.cookies.token;

        if(!token)
           return res.status(500).json({
                message: "Please Login",
            });

        const DecodeData = jwt.verify(token, process.env.JWT_SECRET);
        if(!DecodeData)
            return res.status(403).json({
        message: "Token Expired",
    });

    req.user = await User.findById(DecodeData.id);
    next();


    } catch (error) {
        res.status(500).json({
            message: "Please Login",
        })
    }


}

export default isAuth;
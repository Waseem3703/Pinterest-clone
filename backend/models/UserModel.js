import mongoose from "mongoose";

const schema = new mongoose.Schema({
      name: {
        type: String,
        reqiured: true,
      },
      email: {
        type: String,
        reqiured: true,
        unique: true,
      },
      password: {
        type: String,
        reqiured: true,
      },
      follower: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    ],
    following: [
        { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
    ],},
     {
        timestamps: true,
     }
    );

export const User = mongoose.model("User", schema);
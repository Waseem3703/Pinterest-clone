import { User } from "../models/UserModel.js";
import bcrypt from   "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import GenerateToken from "../utils/GenerateToken.js";


export const RegisterUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields (name, email, password) are required",
        });
    }

    const UserExist = await User.findOne({ email });

    if (UserExist) {
        return res.status(400).json({
            message: "Already have an account with this Email",
        });
    }

    try {
        const HashPassword = await bcrypt.hash(password, 10);

        const NewUser = await User.create({
            name,
            email,
            password: HashPassword,
        });

        GenerateToken(NewUser._id, res);

        res.status(201).json({
            user: NewUser,
            message: "User Registered Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});


export const LoginUser = TryCatch(async(req, res)=>{
    
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "User Not Registered with this Email, Please Sign Up",
        });
    }
    const ComparePassword = bcrypt.compare(password, user.password);
    if(!ComparePassword){
        return res.status(400).json({
            message: "Wrong Password, Please Reset it",
        });
    }
    //calling token

    GenerateToken(user._id, res);

    res.json({
        user,
        message: "Logged in",
    })

});

export const MyProfile = TryCatch (async (req, res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
});

export const UserProfile = TryCatch (async (req, res)=>{
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
});

//follow and unfollow
export const FollowAndUnFollw = TryCatch(async(req, res)=>{
    const user = await User.findById(req.params.id);
    const LoggedInUser = await User.findById(req.user._id);

    if(!user){
        return res.status(400).json({
            message: "No user found with this id",

        });
    }
    if(user._id.toString() === LoggedInUser._id.toString()){
        return res.status(400).json({
            message: "You can't follow yourself",
        });

    }

    if(user.follower.includes(LoggedInUser._id)){
        const indexFollowing = LoggedInUser.following.indexOf(user._id);
        const indexFollowers = user.follower.indexOf(LoggedInUser._id);

        LoggedInUser.following.splice(indexFollowing, 1);
        user.follower.splice(indexFollowers, 1);

        await LoggedInUser.save()
        await user.save()
        res.json({
            message: "User Unfollowed",
        });
    } else{
        LoggedInUser.following.push(user._id);
        user.follower.push(LoggedInUser._id);

        await LoggedInUser.save()
        await user.save()
        res.json({
            message: "User followed",
        });
    }
    
});

export const LogOut = TryCatch(async(req, res)=>{
    res.cookie("token" , "", {maxAge: 0});

    res.json({
        message: "Logged out Succesfully",
    })
})

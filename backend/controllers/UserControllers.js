import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import GenerateToken from "../utils/GenerateToken.js";

export const RegisterUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const UserExist = await User.findOne({ email });

    if (UserExist) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const NewUser = await User.create({
        name,
        email,
        password: HashPassword,
        followers: [],
        following: [],
    });

    await GenerateToken(NewUser._id, res);

    res.status(201).json({ user: NewUser, message: "User Registered Successfully" });
});

export const LoginUser = TryCatch(async (req, res) => {
    console.log("Login Request Body:", req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not registered" });
    }

    if (!user.password) {
        return res.status(500).json({ message: "Password hash missing" });
    }

    const ComparePassword = await bcrypt.compare(password, user.password);
    if (!ComparePassword) {
        return res.status(400).json({ message: "Wrong password" });
    }

    await GenerateToken(user._id, res);

    res.status(200).json({ user, message: "Logged in successfully" });
});

export const MyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
});

export const UserProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

export const FollowAndUnFollw = TryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    const LoggedInUser = await User.findById(req.user._id);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user._id.toString() === LoggedInUser._id.toString()) {
        return res.status(400).json({ message: "You can't follow yourself" });
    }

    user.followers = user.followers || [];
    LoggedInUser.following = LoggedInUser.following || [];

    if (user.followers.includes(LoggedInUser._id)) {
        user.followers = user.followers.filter((id) => id.toString() !== LoggedInUser._id.toString());
        LoggedInUser.following = LoggedInUser.following.filter((id) => id.toString() !== user._id.toString());

        await LoggedInUser.save();
        await user.save();
        return res.json({ message: "User Unfollowed" });
    } else {
        user.followers.push(LoggedInUser._id);
        LoggedInUser.following.push(user._id);

        await LoggedInUser.save();
        await user.save();
        return res.json({ message: "User Followed" });
    }
});

export const LogOut = TryCatch(async (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    res.json({ message: "Logged out successfully" });
});

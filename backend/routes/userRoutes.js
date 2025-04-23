import express from "express";
import {
  LoginUser,
  RegisterUser,
  MyProfile,
  UserProfile,
  FollowAndUnFollw,
  LogOut
} from "../controllers/UserControllers.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", isAuth, LogOut);
router.get("/me", isAuth, MyProfile);
router.get("/:id", isAuth, UserProfile);
router.post("/follow/:id", isAuth, FollowAndUnFollw);

export default router;

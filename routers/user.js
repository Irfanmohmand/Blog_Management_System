import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { homePage, register, login, logout, getMyProfile } from "../controllers/userController.js";


const router = express.Router();


router.get("/", homePage);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getmyprofile", isAuthenticated, getMyProfile)


export default router;
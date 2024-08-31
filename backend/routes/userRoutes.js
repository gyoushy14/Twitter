import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from "../controllers/user_Controllers.js";

const Userrouter = express.Router();

Userrouter.get("/profile/:username", protectRoute, getUserProfile);
Userrouter.get("/suggested", protectRoute, getSuggestedUsers);
Userrouter.post("/follow/:id", protectRoute, followUnfollowUser);
Userrouter.post("/update", protectRoute, updateUser);
export default Userrouter;
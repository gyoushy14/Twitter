
import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/postCotrollers.js";

const postrouter = express.Router();

postrouter.get("/all", protectRoute, getAllPosts);
postrouter.get("/following", protectRoute, getFollowingPosts);
postrouter.get("/likes/:id", protectRoute, getLikedPosts);
postrouter.get("/user/:username", protectRoute, getUserPosts);
postrouter.post("/create", protectRoute, createPost);
postrouter.post("/like/:id", protectRoute, likeUnlikePost);
postrouter.post("/comment/:id", protectRoute, commentOnPost);
postrouter.delete("/:id", protectRoute, deletePost);

export default postrouter;

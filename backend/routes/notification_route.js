import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification_controllers.js";

const notification_route = express.Router();


notification_route.get("/" , protectRoute , getNotifications);
notification_route.delete("/" , protectRoute , deleteNotifications);


export default notification_route;
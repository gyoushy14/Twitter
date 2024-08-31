import express from "express";
import router from "./routes/auth_routes.js";
import dotenv from "dotenv";
import connection from "./db/conections.js";
import cookieParser from "cookie-parser";
import Userrouter from "./routes/userRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import postrouter from "./routes/postroutes.js";
import notification_route from "./routes/notification_route.js";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api/auth", router);
app.use("/api/users", Userrouter);
app.use("/api/posts", postrouter);
app.use("/api/notifications", notification_route);


app.listen(8000, () => {
    console.log(`Server is Runnig on ${PORT}`);
    console.log(process.env.MONGO_URL);
    connection();
});
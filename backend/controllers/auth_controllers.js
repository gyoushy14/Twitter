import { generateTokenAndCookies } from "../lib/utils/generateToken.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)) {
            return res.status(400).json({ error: "Invalid Email" })
        }
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" })

        }

        const existingEmail = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" })

        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" })
        }
        // HASHED PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            fullname,
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateTokenAndCookies(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,

            })
        } else {
            res.status(400).json({ msg: "ERRORRRRR!" });
        }
    } catch (error) {
        res.status(500).json({ msg: "EROR IN Signup " })
        console.log("EROR IN AUTH ");

    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        const iSpasswordValid = await bcrypt.compare(password, user?.password || "");
        if (!user || !iSpasswordValid) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        generateTokenAndCookies(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    } catch (error) {
        res.status(500).json({ msg: "EROR IN Login " })
        console.log("EROR IN Login ");
    }


}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { max: 0 })
        res.status(200).json({ msg: "Successfully Logout Operation" })
    } catch (error) {
        res.status(500).json({ msg: "EROR IN Logout " })
        console.log("EROR IN Logout ");
    }
}



export const getMe = async(req,res)=>{
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "EROR IN GETME " })
        console.log("EROR IN GETME ");
    }
}

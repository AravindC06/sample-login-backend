const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

const secertKey = process.env.JWT_SECERT_KEY;

const AuthService = {

    isValidateUser: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            console.log(user)
            if (!user) return res.status(500).json({ message: "Can't find user" });
            // const passwordMatch = await bcrypt.compare(password, password);
            // if (!passwordMatch) return res.status(500).json({ message: "Invalid creditenals" })
            return user;
        } catch (error) {
            console.log("Error connecting database" || error);
            return null;
        }
    },

    // registerNewUser: async (email) => {
    //     try {
    //         const user = await User.findOne({ email });
    //         if (user) return res.status(500).json({ message: "Registered User" });
    //         const
    //     }
    //     catch (error) {

    //     }
    // },

    newRefreshToken: async (checkUser) => {
        try {
            const options = {
                algorithm: "HS256",
                expiresIn: "30d",
            };
            const payload = { name: checkUser.name, role: checkUser.role }
            console.log(payload, secertKey, options)
            const refreshToken = jwt.sign(payload, secertKey, options);
            await User.findByIdAndUpdate(checkUser._id, { $set: { refreshToken } }, { new: true });
            console.log(refreshToken);
            return refreshToken;
        }
        catch (error) {
            console.log("Error creating refresh token")
        }
    },


    newAccessToken: async (checkUser, newRefreshToken) => {
        try {
            const options = {
                algorithm: "HS256",
                expiresIn: "30d",
            };
            const payload = { name: checkUser.name, role: checkUser.userRole }
            const accessToken = jwt.sign(payload, secertKey, options);
            console.log(accessToken);
            return accessToken;
        }catch(error){
            console.log(error || "Error generating access token")
        }
    },

    saveCookie: async (res, accessToken, refreshToken) => {
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === "true",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
}

module.exports = AuthService;
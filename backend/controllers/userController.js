const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Time = require("../models/timeModels");
const generateToken = require("../utils/generateToken");
const moment = require('moment');  
const mongoose = require("mongoose");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const timestamp = (new mongoose.Types.ObjectId).getTimestamp();
    const timelogin = moment(timestamp,"DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");
    const timelogout = 0;
    const hasiltime = 0;

    if (user) {
        await Time.create({
            email,
            name,
            timelogin,
            timelogout,
            hasiltime,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const timestamp = (new mongoose.Types.ObjectId).getTimestamp();
    const timelogin = moment(timestamp,"DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");
    const timelogout = 0;
    const hasiltime = 0;

    const user = await User.findOne({ email });

    const userTime = await Time.findOne({ email });

    if(userTime) {
        userTime.email = userTime.email;
        userTime.name = userTime.name;
        userTime.timelogin = timelogin;
        userTime.timelogout = timelogout;
        userTime.hasiltime = hasiltime;

        await userTime.save();
    } else {
        if(user) {
            const name = user.name;

            await Time.create({
                email,
                name,
                timelogin,
                timelogout,
                hasiltime,
            });
        }
    }

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const timestamp = (new mongoose.Types.ObjectId).getTimestamp();
    const timelogout = moment(timestamp,"DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm");

    const user = await User.findOne({ email });

    const userTime = await Time.findOne({ email });

    if(userTime) {
        const ms = moment(timestamp,"DD/MM/YYYY HH:mm").diff(moment(userTime.timelogin,"DD/MM/YYYY HH:mm:ss"));
        const k = moment.utc(ms).format("HH:mm");
        const d = moment.duration(k).asMinutes();

        userTime.email = userTime.email;
        userTime.name = userTime.name;
        userTime.timelogin = userTime.timelogin;
        userTime.timelogout = timelogout;
        userTime.hasiltime = d;

        await userTime.save();
    }

    if (user) {
        res.status(201).json({
            data: "berhasil",
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

module.exports = { registerUser, authUser, logoutUser }; 
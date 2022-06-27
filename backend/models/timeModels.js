const mongoose = require("mongoose");

const timeSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        timelogin: {
            type: String,
            required: true,
        },
        timelogout: {
            type: String,
            required: true,
        },
        hasiltime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
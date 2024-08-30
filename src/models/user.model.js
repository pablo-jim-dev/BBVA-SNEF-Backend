import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    activity: {
        type: String,
        required: true
    },
    giveaway: {
        type: Boolean,
        default: false,
        required: false
    },
    games: {
        type: Array,
        default: [],
    }
});

export const User = model("User", userSchema);
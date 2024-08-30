import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error", error);
    }
}
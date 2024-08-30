import { Schema, model } from "mongoose";

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: Object,
        default : {}
    }
})

export const Game = model("Game", gameSchema);
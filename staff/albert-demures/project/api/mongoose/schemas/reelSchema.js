import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose

export const reelSchema = new Schema ({
    owner: {
        type: ObjectId,
        ref: 'User'
    },

    textColor: {
        type: String
    },

    backgroundColor: {
        type: String
    }
})
import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose

export const reelSchema = new Schema ({
    ownerId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    textColor: {
        type: String
    },

    backgroundColor: {
        type: String
    }

})
import mongoose from 'mongoose'
import { URL_REGEX } from 'com'

const { Schema, ObjectId } = mongoose

export const articleSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        minLength: 1,
        required: true
    },

    subtitle: {
        type: String,
        minLength: 1,
    },

    date: {
        type: Date,
        required: true
    },

    paragraph0: {
        type: String,
        minLength: 1,
        required: true
    },

    image0: {
        type: String,
        match: URL_REGEX,
    },

    paragraph1: {
        type: String,
        minLength: 1,
    },

    image1: {
        type: String,
        match: URL_REGEX,
    },

    paragraph2: {
        type: String,
        minLength: 1,
    },

    image2: {
        type: String,
        match: URL_REGEX,
    },

    paragraph3: {
        type: String,
        minLength: 1,
    },

    image3: {
        type: String,
        match: URL_REGEX,
    },

    visibility: {
        type: String,
        minLength: 1,
        required: true
    }

})

import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Comment's title is required!"],
            minLength: [
                2,
                "Comment's title must be at least 2 characters long!",
            ],
        },
        comment: {
            type: String,
            required: [true, "Comment's text is required!"],
            minLength: [
                2,
                "Comment's text must be at least 2 characters long!",
            ],
        },
        author: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const animal = new Schema(
    {
        name: {
            type: String,
            required: [true, "Animal's name is required!"],
            minLength: [2, "Animal's name must be at least 2 characters long!"],
        },
        species: {
            type: String,
            required: [true, "Animal's species is required!"],
            minLength: [
                3,
                "Animal's species must be at least 3 characters long!",
            ],
        },
        breed: {
            type: String,
            required: [true, "Animal's breed is required!"],
            minLength: [
                3,
                "Animal's breed must be at least 3 characters long!",
            ],
        },
        age: {
            type: Number,
            required: [true, "Animal's age is required!"],
            min: [0, "Animal's age must be at least 0!"],
        },
        imageUrl: {
            type: String,
            required: [true, "Animal's imageUrl is required!"],
            // match: [
            //     /^https?:\/\//,
            //     "Animal's imageUrl has to be start with http://... or https://...!",
            // ],
        },
        description: {
            type: String,
            required: [true, "Animal's description is required!"],
            minLength: [
                10,
                "Animal's description must be at least 10 characters long!",
            ],
        },
        comments: [commentSchema],
        liked: [{ type: Types.ObjectId, ref: "User" }],
        author: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Animal = model("Animal", animal);

export default Animal;

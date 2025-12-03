import bcrypt from "bcrypt";

import User from "../models/User.js";
import { generateAuthToken } from "../utils/userUtils.js";

export async function register(userData) {
    // const email = userData.email;
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error("The email already exists!");
    }

    const user = await User.create(userData);
    const token = generateAuthToken(user);
    return {
        email: user.email,
        accessToken: token,
        username: user.username,
        _id: user.id,
    };
}

export async function login(userData) {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error("Invalid email or password!");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password!");
    }

    const token = generateAuthToken(user);
    return {
        email: user.email,
        accessToken: token,
        username: user.username,
        _id: user.id,
    };
}

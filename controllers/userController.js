const User = require("../models/userModel");
let userList = async (req, res) => {
    try {
        const users = await User.find();
        console.log("Fetched Users:", users);
        res.json({ users, length: users.length });
    } catch (err) {
        console.error("Error on GET path:", err);
        res.status(500).json({ error: "Server error" });
    }
}

let createUser = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        if (!name || !phone || !email || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newUser = new User({ name, email, phone, message });
        const result = await newUser.save();

        res.status(201).json({
            message: "User created successfully!",
            user: result
        });
    } catch (err) {
        console.error("Error at adding new user:", err);
        res.status(500).json({ error: "Failed to create user" });
    }
}

let deleteUser = async (req, res) => {
    try {
        let { id } = req.params;

        let deletedUser = await User.deleteOne({ _id: id });
        res.status(200).json({ message: "user deleted ", deletedUser })
    }
    catch (err) {
        res.status(400).json({ message: "somthing went wrong", err })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData);

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


module.exports = { userList, createUser, deleteUser, updateUser }
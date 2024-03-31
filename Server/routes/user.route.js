const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password, type } = req.body;
        const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        if (existingUser) {
            return res.status(201).json({ msg: "User with this name or email already exists" });
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new UserModel({ name, email, type, password: hash });
            await user.save();
            res.status(201).json({ msg: "Signup Successfully!" });
        });

    } catch (err) {
        res.status(500).json({ msg: "Signup Failed!", error: err.message });
        console.error(err);
    }
});

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, "admin");
                    res.send({ msg: "Login Successful", "token": token, userDetails: { "user": user[0].name, "type": user[0].type, "email": user[0].email } })
                } else {
                    res.send({ msg: 'Invalid email / password Plese Try again!' })
                }
            });
        } else {
            res.send({ msg: "Invalid email / password Plese Try again!", "error": err })
        }

    } catch (err) {
        res.send({ msg: "Invalid email / password Plese Try again!", "error": err })
    }
})

UserRouter.post("/logout", async (req, res) => {
    try {
        const { email } = req.body;
        await UserModel.findOneAndUpdate({ email }, { token: null });

        res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        res.status(500).json({ msg: "Logout failed", error: error.message });
    }
});

module.exports = {
    UserRouter
};

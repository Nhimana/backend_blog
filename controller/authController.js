import express from "express";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { User } from "../db/userSchema.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);
    await User.create({
      email,
      password: hash,
    });
    res.send({ message: "account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(401).json({ message: "user account not found" });
    console.log(user);
    if (bcrypt.compareSync(password, user.password)) {
      const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      return res.send({ token });
    }
    res.status(401).json({ message: "password mismatch" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as authController };

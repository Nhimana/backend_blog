import { compareSync, genSalt, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/userSchema.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "user account not found" });

    if (compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      return res.json({ token });
    }
    res.status(401).json({ message: "password mismatch" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */


export async function signupController(req, res) {
  try {
    const { email, password } = req.body;
    const salt = await genSalt(10);
    const hash = hashSync(password, salt);
    await User.create({
      email,
      password: hash,
    });
    res.json({ message: "account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


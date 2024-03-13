import { compareSync, genSalt, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/userSchema.js";
import Joi from "joi";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */

export async function loginController(req, res) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    const { error, value, warning } = schema.validate(req.body)

    if (error) return res.status(400).json(error)
    if (warning) return res.status(400).json(warning)

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ message: "user account not found" });

    if (compareSync(value.password, user.password)) {
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
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
    const { error, value, warning } = schema.validate(req.body)

    if (error) return res.status(400).json(error)
    if (warning) return res.status(400).json(warning)

    const salt = await genSalt(10);
    const hash = hashSync(value.password, salt);
    await User.create({
      email: value.email,
      password: hash,
    });
    res.json({ message: "account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


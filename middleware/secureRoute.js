import jwt from "jsonwebtoken";
import { User } from "../db/userSchema.js";
export const protectRoute = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken?.startsWith("Bearer"))
      return res.status(401).json({ message: "loggin failed" });
    if (jwt.verify(bearerToken.split(" ")[1], process.env.JWT_SECRET)) {
      const decodedData = jwt.decode(bearerToken.split(" ")[1]);
      const user = await User.findById(decodedData.id);
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "loggin failed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

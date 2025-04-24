import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (phone) => {
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ phone }, secretKey, { expiresIn: "7d" });
    return token;
}
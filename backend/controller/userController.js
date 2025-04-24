import UserNumber from "../model/UserNumber.js";
import { generateToken } from "../utils/tokenUtils.js";

export const verifyToken = async (req, res) => {
    const { phone  } = req.body;
    try {
        await UserNumber.deleteMany();
        await new UserNumber({ phone }).save();
        const token = generateToken(phone);
        res.status(200).json({success: true, token });

    } catch (error) {
      return res.status(401).json({success: false, message: "Failed to save phone"});
    }
  };    

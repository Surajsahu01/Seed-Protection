import express from "express";
import { verifyToken } from "../controller/userController.js";

const router = express.Router();

// router.post("/phone",async (req, res) => {
//     const { phone } = req.body;

//     try {
//         // Save latest number, optionally clear old ones
//         await UserNumber.deleteMany(); // only 1 number stored
//         await new UserNumber({ phone }).save();
//         res.status(200).json({ success: true });
        
//     } catch (error) {
//         console.error("Error saving phone number:", error);
//         return res.status(500).json({ message: "Internal server error" });
        
//     }
// });

router.post("/phone", verifyToken);

export default router;
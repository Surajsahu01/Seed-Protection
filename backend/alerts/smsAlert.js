import twilio from "twilio";
import dotenv from "dotenv";
import UserNumber from "../model/UserNumber.js";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendSMSAlert = async () => {
//   try {
//     const message = await client.messages.create({
//       body: "🔥 ALERT: Flame detected in your IoT system. Please check immediately!",
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: process.env.ADMIN_PHONE_NUMBER,
//     });
//     console.log("🔥 SMS sent successfully:", message.sid);
//   } catch (error) {
//     console.error("❌ Error sending SMS:", error);
//   }
// };

export const  sendFlameAlertSMS = async () => {
  const user = await UserNumber.findOne(); 
  if (!user || !user.phone) return;

  await client.messages.create({
    body: "🔥 Alert: Flame detected in the seed protection system!",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: user.phone,
  });
}

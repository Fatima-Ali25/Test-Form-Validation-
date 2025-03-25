import nodemailer from "nodemailer";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps): Promise<void> => {
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP environment variables are missing.");
    }

    if (!process.env.DOMAIN) {
      throw new Error("DOMAIN environment variable is missing.");
    }

    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user based on email type
    const updateFields =
      emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateFields);

    // Configure nodemailer transport
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: "no-reply@example.com", // Update with a proper no-reply email
      to: email,
      subject: emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
      <p>Or copy and paste the following link into your browser:</p>
      <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // Send email
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again.");
  }
};
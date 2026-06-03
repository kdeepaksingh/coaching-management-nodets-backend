import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,

  port: Number(process.env.EMAIL_PORT),

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOtpEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Verify OTP",

    html: `
      <h2>Your OTP</h2>
      <h1>${otp}</h1>
      <p>Expires in 10 minutes</p>
    `,
  });
};

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const sender = process.env.EMAIL_USER;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: sender,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const POST = async (req) => {
  const { data } = await req.json();
  const { email, subject, message } = data;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: [email, sender],
      subject: subject,
      text: "hire",
      html: `<div style="overflow: auto;">
                <h1>${subject}</h1>
                  <p>Thank you for contacting us!</p>
                  <p>New message submitted:</p>
                  <p>${message}</p>
              </div>`,
    });

    return new NextResponse(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};

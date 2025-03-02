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

export default async function handler(
  req = NextApiRequest,
  res = NextApiResponse
) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;
    try {
      const data = await transporter.sendMail({
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

      return res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // If not POST
  }
}

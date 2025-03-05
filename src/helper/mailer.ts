import path from "node:path";
import nodemailer from "nodemailer";
import { logError } from "./logger";

export const sendMail = async (to: string, subject: string, html: string) => {
  // console.log(process.env.SMTP_HOST);

  // Looking to send emails in production? Check out our Email API/SMTP product!
  // const transport = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT),
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });

  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "383bb8861ec352",
      pass: "03edfd0996c02d",
    },
  });

  try {
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully to: ", to);
  } catch (error) {
    console.error(error.message);
    logError(to, subject, html, error.message);
  }
};

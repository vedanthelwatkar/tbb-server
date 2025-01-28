import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "vedannnnnnt@gmail.com",
    pass: "dsupcdvuwtklwnia",
  },
});

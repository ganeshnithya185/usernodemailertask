import nodemailer from "nodemailer";
const sendmail = (user, token) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ganeshnithya185@gmail.com",
      pass: "isjp fjtl cjgv ptao",
    },
  });
  let details = {
    from: "ganeshnithya185@gmail.com",
    to: "ganeshnithya185@gmail.com",
    subject: "Reset your password",
    text: `http://localhost:3000/reset-password/${user._id}/${token}`,
  };
  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("mail not send");
    } else {
      console.log("mail sent successfully");
    }
  });
};
export default sendmail;

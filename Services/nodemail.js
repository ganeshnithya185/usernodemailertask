import nodemailer from "nodemailer"
const mail=()=>{
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
      subject: "Login msg",
      text: "Login Successfully",
    };
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log("mail not send")
        }else{
            console.log("mail sent successfully")
        }
    })
}
export default mail;

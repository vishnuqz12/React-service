const nodemailer = require("nodemailer");

// var smtpConfig = {
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//       user: 'uvishnu69@gmail.com',
//       pass: '123456789000'
//   }
// };

let transporter = nodemailer.createTransport(

  // smtpConfig
  
  {
  service: "gmail",
  auth: {

    //enter your email and password
    user: 'uvishnu69@gmail.com',
    pass: '123456789000'
  }
}

);

function sendEmail(sendTo, subject, body) {
    let mailOptions = {
        from: 'uvishnu69@gmail.com',
        to: sendTo,
        subject: subject,
        text: body
      };
      
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
          console.log("error on send email "+error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
}

module.exports= sendEmail;
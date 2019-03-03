import nodemailer from 'nodemailer';

function mailUser(email, password) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'successgilli@gmail.com',
      pass: 'quininmotion2',
    },
  });
  const mailOptions = {
    from: 'successgilli@gmail.com',
    to: email,
    subject: 'Gtech is checking shit',
    text: `you registered with the email: ${email}, and password: ${password}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}

export default mailUser;

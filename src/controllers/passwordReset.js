import nodemailer from 'nodemailer';

class EmailReset {
  static resetEmail(req, res) {
    try {
      const { email } = req.body;
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
        text: 'Im just checking my node email sender if it works....try replying let me see nd check the link below. Thanks',
        html: '<a href = "https://successgilli.github.io/politico/">My App</a>',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            status: 400,
            message: 'email not sent',
          });
        } else {
          console.log(`Email sent: ${info.response}`);
          res.status(200).json({
            status: 200,
            data: [{
              message: 'Check your email for password reset link',
              email, // email specified by user
            }],
          });
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  }
}

export default EmailReset;

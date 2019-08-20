const nodemailer = require('nodemailer');
const striptags = require('striptags');

const {MAIL_USERNAME, MAIL_PASSWORD, MAIL_SERVICE} = process.env

const smtpConfig = {
  service: MAIL_SERVICE,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
}

module.exports = function (recipient_email, subject, htmlmessage, attachments, replyTo) {
    const mailtransporter = nodemailer.createTransport(smtpConfig);
    
    const mailOptions = {
      from: process.env.APP_NAME, // sender address
      to: recipient_email, // list of receivers
      subject, // Subject line
      text: striptags(htmlmessage), // plaintext body
    };

    if (replyTo !== undefined) {
      mailOptions.replyTo = replyTo;
    }

    if (attachments !== undefined) {
      mailOptions.attachments = attachments;
    }

    return new Promise((resolve, reject)=>{
        mailtransporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(`***MAIL*** Problem sending mail ${error}`);
            return reject(error)
          }
          console.log(`***MAIL*** Message sent: ${info.response}`);
          return resolve(info.response)
        });
    })
}

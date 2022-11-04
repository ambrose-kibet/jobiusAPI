const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: process.env.ADMIN_EMAIL,
    subject,
    html,
  };
  return sgMail.send(msg);
};

module.exports = sendEmail;

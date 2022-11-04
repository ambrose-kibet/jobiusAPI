const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ email, token, origin, name }) => {
  const resetURL = `${origin}/verify-email?token=${token}&email=${email}`;
  const message = `<p>
      please follow this link to verify your email:
      <a href="${resetURL}" target="_blank" style={{ fontWeight:"bold" }}>
        Verify Email
      </a>
    </p>`;
  return sendEmail({
    to: email,
    subject: "Verify Email",
    html: `<h4>Hello there ${name}</h4>
  ${message}`,
  });
};
module.exports = sendVerificationEmail;

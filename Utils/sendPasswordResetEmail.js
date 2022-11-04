const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({ email, name, origin, token }) => {
  const resetURL = `${origin}/reset-password?token=${token}&email=${email}`;
  const message = `  <p>
      please follow this link to reset your password :
      <a href="${resetURL}" target="_blank" style={{ fontWeight: "bold" }}>
        Reset Password
      </a>
    </p>`;
  await sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h1>Hello ${name}</h1>
    ${message}`,
  });
};
module.exports = sendVerificationEmail;

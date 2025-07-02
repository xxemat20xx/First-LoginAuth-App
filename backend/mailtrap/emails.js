const { mailtrapClient, sender } = require('./mailtrap.config');
const { VERIFICATION_EMAIL_TEMPLATE } = require('./emailTemplates');

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html,
      category: "Email verification"
    });

    console.log("✅ Email sent:", response);
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Error sending email: " + error.message);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{email}];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9e664ed9-a7a6-4b95-936a-aea050d4f0fa",
      template_variables:{
             "company_info_name": "Auth Company",
              "name": name
      }
    })
    console.log("Welcome email sent successfully");
  } catch (error) {
    
  }
}

module.exports ={
  sendVerificationEmail,
  sendWelcomeEmail
};

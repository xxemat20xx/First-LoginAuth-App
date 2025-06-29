const { mailtrapClient, sender } = require('./mailtrap.config');
const {VERIFICATION_EMAIL_TEMPLATE} = require('./emailTemplates')
const sendVerificationEmail = async(email, verificationToken) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to:  recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
            category: "Email verification"
        })
        console.log("Email sent ", response)
    } catch (error) {
        console.error(error)
        throw new Error('Error sending verification ', error);
        
    }
}
module.exports = sendVerificationEmail;
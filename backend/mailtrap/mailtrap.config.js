require('dotenv').config();
const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_TOKEN;
if (!TOKEN) {
  throw new Error("Missing MAILTRAP_TOKEN in .env");
}

const mailtrapClient = new MailtrapClient({
  token: TOKEN
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
module.exports = {
  sender,
  mailtrapClient
}


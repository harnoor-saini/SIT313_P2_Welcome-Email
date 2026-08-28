require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
const path = require("path");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const msg = {
    to: email,
    from: "harnoorsaini17@gmail.com",
    subject: "Welcome to my Newsletter!",
    html: `<h2>Hey, Thanks for Subscribing!</h2>
    <p>Welcome! I'll share my latest projects and coding tips with you.</p>
    <p>Stay tuned!</p>
    <p>- Harnoor</p>`,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

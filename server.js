require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const expressLayouts = require("express-ejs-layouts");
const superagent = require("superagent");
const axios = require("axios");
const Reminder = require("./models/Reminder.model"); 

const app = express();
const port = 3000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

// MongoDB connection
mongoose
  .connect(
    process.env.MongoDB_ConnectionString
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Google_app_username,
    pass: process.env.Google_app_secret,
  },
});

// Routes
app.get("/", (req, res) =>
  res.send(
    `<a href="https://github.com/login/oauth/authorize?client_id=${process.env.Github_ClientID}">Login With Github</a>`
  )
);
app.get("/profile", (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("Code not provided");
  }
  superagent
    .post("https://github.com/login/oauth/access_token")
    .send({
      client_id: process.env.Github_ClientID,
      client_secret: process.env.Github_SecretCode,
      code: code,
    })
    .set("Accept", "application/json")
    .end((err, result) => {
      if (err) {
        return res.status(500).send("Error fetching access token");
      }
      console.log(result.body);
      const accessToken = result.body.access_token;
      if (!accessToken) {
        return res.status(400).send("Access token not received");
      }

      const options = {
        url: "https://api.github.com/user",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Zomato-API",
        },
      };
      axios(options)
        .then((response) => {
          const userData = response.data;
          res.render("profile", { user: userData });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          res.status(500).send("Error fetching user data");
        });
    });
});

app.get("/home", (req, res) => {
  res.render("index", { title: "Zomato API Home", currentPage: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - Email Reminder App",
    currentPage: "about",
  });
});

app.get("/reminders", async (req, res) => {
  try {
    const reminders = await Reminder.find().sort({ scheduledTime: 1 });
    res.render("reminders", {
      reminders,
      title: "My Reminders",
      currentPage: "reminders",
    });
  } catch (error) {
    res.redirect("/?error=true");
  }
});

app.get("/schedule", (req, res) => {
  res.render("schedule", {
    title: "Schedule Reminder",
    currentPage: "schedule",
  });
});

app.post("/schedule", async (req, res) => {
  try {
    const { email, message, datetime } = req.body;
    const reminder = new Reminder({
      email,
      message,
      scheduledTime: new Date(datetime),
    });
    await reminder.save();
    res.redirect("/schedule?success=true");
  } catch (error) {
    res.redirect("/schedule?error=true");
  }
});

// Importing routes
app.use("/location", require("./routes/location.routes"));
app.use("/mealTypes", require("./routes/mealTypes.routes"));
app.use("/orders", require("./routes/orders.routes"));
app.use("/restaurantMenu", require("./routes/restaurantMenu.routes"));
app.use("/restaurantData", require("./routes/restaurantData.routes"));


// Cron job to check and send reminders
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const reminders = await Reminder.find({
      scheduledTime: { $lte: now },
      sent: false,
    });

    for (const reminder of reminders) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: reminder.email,
        subject: "Reminder",
        text: reminder.message,
      });

      reminder.sent = true;
      await reminder.save();
    }
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
});

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
require("./db/mongoose");
const Customer = require("./models/customers");
const Category = require("./models/category");

// load route
// const admin = require("./routes/admin");
// const connection = require("./db");

const app = express();
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectory));

hbs.registerPartials(partialsPath);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.render("index");
});
app.get("/bill", (req, res) => {
  res.render("bill");
});
app.get("/thanks", (req, res) => {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = "AC18727d75891aa70b1f3f95a4c4b654cc";
  const authToken = "3973bf8e41c576865069d183d2f40737";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+919867563127",
      to: "+919867563127",
    })
    .then((message) => console.log(message.sid));

  //res.render("thanks");
});

app.post("/bill", (req, res) => {
  let total_amount;
  if (req.body.discount) {
    total_amount = req.body.amount - req.body.discount;
  } else {
    total_amount = req.body.amount;
  }
  // console.log(total_amount);
  console.log(req.body);
  req.body.total_amount = total_amount;
  const customer = new Customer(req.body);

  customer
    .save()
    .then(() => {
      // res.send(customer);
      res.redirect("/thanks");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/category", (req, res) => {
  res.render("category");
});

app.post("/category", (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then(() => {
      res.send(category);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("listening on port 3000");
});

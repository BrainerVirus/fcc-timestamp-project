// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();
require("dotenv").config();
const moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const e = require("express");
app.use(cors({ origin: "*", optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:dateUnix", (req, res) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  let date = req.params.dateUnix;
  if (!regex.test(date)) {
    date = parseInt(date);
    console.log("parse date: ", date);
  }
  console.log("params: ", req.params.dateUnix);
  const unix = new Date(date).getTime();
  const utc = new Date(date).toUTCString();
  if (!moment(date).isValid()) return res.json({ error: "Invalid Date" });
  res.json({ unix: unix, utc: utc });
});
app.get("/api/", (req, res) => {
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();
  res.json({ unix: unix, utc: utc });
});

const port = 8080;

// listen for requests :)
var listener = app.listen(process.env.PORT || port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Campground = require("./models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    description: "cheap camping!",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});

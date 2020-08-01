const express = require("express");
const logger = require("morgan");
// morgan logs our database
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("*", (req, res) =>
{res.send("<h1>hello world</h1>")

})
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.get("/exercise", (req, res) => {
  res.sendfile(__dirname + "/public/exercise.html");
});

app.get("/stats", (req, res) => {
    res.sendfile(__dirname + "/public/stats.html");
   
    
  
})
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .populate("exercises")
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
})
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });







app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

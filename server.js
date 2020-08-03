const express = require("express");
const logger = require("morgan");
// morgan logs our database
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});
// html routes

app.get("/", (req, res) => {
    res.sendFile(__dirname, "/public/index.html");
  });
app.get("/exercise", (req, res) => {
  res.sendfile(__dirname + "/public/exercise.html");
});


app.get("/stats", (req, res) => {
    res.sendfile(__dirname + "/public/stats.html");
   

  
})


  //api routes
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
})




app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, (err, data)=>{
if (err){
    console.log(err);
  
}else{
    res.json(data);
}
    })
    
});








   

  











app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

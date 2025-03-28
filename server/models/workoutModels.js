const mongoose = require("mongoose");


const workoutSchema = mongoose.Schema({
  title:{
    type:String,
    require: true,
  },
  reps:{
    type:Number,
    require: true,
  },
  load:{
    type:Number,
    require: true,
  }, 
  user_id:{
    type:String,
    require:true
  }
}, {timestamps: true}) // gives the time whenever the data is created

const Workout = new mongoose.model("Workout", workoutSchema);


module.exports = Workout;
const express = require("express");
const authUser = require("../middleware/userMiddleware");
const Workout = require("../models/workoutModels");

const router = express.Router();

//require controllers

const {
  getWorkouts,
  getWorkout,
  createWorkout,
  editWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");


router.use(authUser);


//Get entire data
router.get("/", getWorkouts);
//Get single record
router.get("/:id", getWorkout);

//Create Record
router.post("/", createWorkout);

//Update Record
router.patch("/:id", editWorkout);

//Delete Record
router.delete("/:id", deleteWorkout);

module.exports = router;

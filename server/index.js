require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

//Port
const port = process.env.PORT || 4000

// Db connection
require("./db/connection")


//Require routes

const workoutRoutes = require("./routes/workoutRoutes")
const userRoutes = require("./routes/userRoutes")


// app.get("/",(req,res)=>{
// res.send("hello")
// })


//Middleware
app.use(express.json())

app.use(cors());

//Routes 
app.use("/api/workout", workoutRoutes );
app.use("/api/user", userRoutes );


app.listen(port, ()=>{
    console.log(`Server is running at PORT: ${port}`)
})
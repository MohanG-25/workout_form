require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
// const mongoose=require('mongoose')
const workoutRoutes=require('./routes/workouts')
const cors=require('cors')
//express app
const app = express()
//middleware
app.use(express.json())
 app.use((req,res,next)=>{
  console.log(req.path,req.method)
   next()
 })
//routes
app.use('/api/workouts',workoutRoutes)
//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & mohan',process.env.PORT)
    })
  })
  .catch((error)=>{
    console.log(error)
  })
app.use(cors());
// app.use(express.json());


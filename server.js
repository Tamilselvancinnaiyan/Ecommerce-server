const express = require ("express");
const bodyParser = require ("body-parser")
const dotenv = require("dotenv");
const connectDb = require("./config/dbconnect");
const authRoute = require ('./routes/authRoute')
const errorHandler= require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT||5000;
connectDb();

app.use(bodyParser.json())
app.use (bodyParser.urlencoded({extende: false}))
app.get('/', (req,res)=>{
    res.send("hello world")
})


app.use ('/api/user', authRoute)

app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
  
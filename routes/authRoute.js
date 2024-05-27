 const express = require("express")
 const router = express.Router();
 const  {createUser, loginUser, getAllusers, getUser}= require("../controller/userController")

 router.post("/register", createUser);
 router.post("/login", loginUser);
 router.get("/getAlluser", getAllusers);
 router.get("/:id", getUser);
 
 module.exports = router;
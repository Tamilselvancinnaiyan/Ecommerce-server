const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel") 
const generateToken = require("../config/jwtToken") 

 const createUser = asyncHandler(async (req, res, next) => {
    const { username, password, email, mobile } = req.body;
    if (!username || !password || !email) {
      res.status(400);
      throw new Error("All fields are required");
    }
  
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
    }
  
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        username,
        email,
        mobile,
        password: hashedPassword,
      });
  
      res.status(201).json({ _id: newUser.id, email: newUser.email });
    } catch (error) {
      res.status(500);
      throw new Error("Error creating user");
    }
  });

  const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateToken(user.id); 

        return res.status(200).json({ accessToken, message:'login sucessfully' });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {createUser, loginUser}
const User = require("../model/userModel")
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

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
    console.log("encrypted password", hashedPassword);
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

module.exports = createUser
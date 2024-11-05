const User = require("../models/Auth/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTP, verifyOTP } = require("../config/sendOTP");
const Collection = require('../models/other/collectionModel')
const Category = require('../models/other/categoryModels')


const SECRET_KEY = process.env.SECRET_KEY || "secret";

// Create a new user
const createAUser = async (req, res) => {
  const { email, password, username } = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  const newUser = new User({
    email,
    password: hashedPassword,
    username,
    createdAt: Date.now(),
    isVerified: false,
    isListed: false,
  });

  try {
    // creating new user/save
    const newUserData = await newUser.save();

    res.status(200).json("ashwanth");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  

  const { email, password } = req.body;

  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password or email" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    // Set the token as an HTTP-only cookie
    res.cookie("userToken", token, { httpOnly: true, maxAge: 3600000 });

    // Send a success response
    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name }, // Include other user details if needed
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or log with google
const googleLog = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Return a success message if the user exists
      // Create a JWT token
      const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      // Set the token as an HTTP-only cookie
      res.cookie("userToken", token, { httpOnly: true, maxAge: 3600000 });

      return res.status(200).json("ashwanth");
    } else {
      const newUser = await User.create({
        email,
        password,
        username,
        createdAt: Date.now(),
        isVerified: false,
        isListed: false,
      });

      const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("userToken", token, { httpOnly: true, maxAge: 3600000 });
    }

    // Return a success message after creating a new user
    res.status(200).json("ashwanth");
  } catch (error) {
    // Return a descriptive error message
    res.status(400).json({ message: error.message });
  }
};


// check user exist
const getUserData = async (req, res) => {
  if (req.user) {
    const { id } = req.user;

    try {
      const user = await User.find({ _id: id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.length <= 0)
        return res.status(404).json({ message: "User not found" });

      if(user[0].isVrified){

        res.status(201).json({verified:true,user});

      }else{

        res.status(201).json({verified:false,user})
      }

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

// getOTP
const getOTP = async (req, res) => {
  const { mail } = req.body;
  const message = await sendOTP(mail);
  if (message) {
    res.status(201).json(message.message);
  } else {
    res.status(400).json(message.message);
  }
};

// conformOTP
const conformOTP = async (req, res) => {
  const { mail, otp } = req.body;
  const { success, message } = verifyOTP(mail, otp);

  if (success) {
    res.status(201).json(message);
  } else {
    res.status(400).json(message);
  }
};


const updateVerification = async (req, res) => {

  const { phone, gender, place, uniqueId } = req.body;  

  try {
    const updatedData = await User.updateOne({ _id: uniqueId }, { phone, gender, place, isVrified:true });
    
    console.log(updatedData);
    
    // Send a success response back to the client
    res.status(200).json({
      message: "User updated successfully",
      updatedData
    });

  } catch (error) {
    console.error("Error updating user:", error);
    
    // Send an error response
    res.status(500).json({
      message: "An error occurred while updating user",
      error: error.message
    });
  }
};


// get Categories
const getCategories = async (req,res)=>{

  try {

      const categories = await Category.find({})
      
      if(categories.length<=0){

          res.status(500).json({mission:false,message:'empty categories',data:[]})

      }else{

          res.status(200).json({mission:true,message:'successfull',data:categories})
      }
      
  } catch (error) {
      return res.status(500).json({mission:false,message: error.messgae }) 
  }

}

const getCollections = async(req,res)=>{

  const array = req.params.array

  try {
    
    if(array){
  
      const categoriesNames = await Collection.find({ _id: { $in: array } }, 'name')
  
      if(categoriesNames){
  
        res.status(201).json({mission:true,message:'successfull',data:categoriesNames})
  
      }else{
  
        res.status(500).json({mission:false,message:'empty colllction',data:[]})
  
      }
  
    }

  } catch (error) {

    res.status(500).json({mission:false,message:error.message})
    
  }


  

}


module.exports = {
  createAUser,
  loginUser,
  googleLog,
  getUserData,
  getOTP,
  conformOTP,
  updateVerification,
  getCategories,
  getCollections
};

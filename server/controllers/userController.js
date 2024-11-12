const User = require("../models/Auth/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTP, verifyOTP } = require("../config/sendOTP");


const SECRET_KEY = process.env.SECRET_KEY || "secret";

// Create a new user
module.exports.createAUser = async (req, res) => {
  const { email, password, username, place, gender, phone } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,
    username,
    place,
    gender,
    phone,
    createdAt: Date.now(),
    isVerified: false,
    isListed: true,
  });

  try {
    const newUserData = await newUser.save();
    res.status(200).json('ahte');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// if user exits 
module.exports.isUerExist = async(req, res)=>{

  const { email } = req.body;
  try {
    
      const userData = await User.findOne({email})
    
      if(userData){
    
        return res.status(500).json('This Email already taken')
    
      }else{
    
        return res.status(200).json({forWord:true})
    
      }
    
  } catch (error) {
    return res.status(500).json(error)
  }

  

}

// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Wrong Password or email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong Password or email" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "9h" });
    res.cookie("userToken", token, { httpOnly: true, maxAge: 3600000 });

    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Google login or signup
module.exports.googleLog = async (req, res) => {
  const { email, password, username, phone, place ,gender  } = req.body;

  try {
    const existingUser = await User.findOne({ email:`${email}.gmail` });

    const verifying = req.body?.gender || existingUser?.gender

    if (existingUser) {

      const updatData = {...req.body,isVerified:verifying?true:false,email:`${email}.gmail`}

      const update = await User.updateOne({email:`${email}.gmail`},{$set:updatData})

      if(verifying){

        const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
          expiresIn: "1h",
        });
  
        res.cookie("userToken", token, { httpOnly: true, maxAge: 3600000 });
      }


      if(update.modifiedCount>0){

  
        return res.status(200).json({data:{...existingUser,isVerified:verifying?true:false},isNew:false});

      }else{

        return res.status(200).json({data:existingUser,isNew:false});

      }
      

    } else {

      const newUser = await User.create({
        email:`${email}.gmail`,
        googleMail:email,
        password,
        username,
        phone,
        place,
        gender,
        createdAt: Date.now(),
        isListed: true,
      });

      return res.status(200).json({data:newUser,isNew:true});
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user data
module.exports.getUserData = async (req, res) => {
  
  if (req.user) {

    const { id } = req.user;

    try {
      const user = await User.find({ _id: id });

      if (!user || user.length <= 0) {

        res.clearCookie('userToken')
        return res.status(404).json({ message: "User not found" });

      }

      if (user[0].isListed) {

        res.status(201).json({ verified: true, user });

      } else {

        res.clearCookie('userToken')
        res.status(201).json({ verified: false, user });

      }

    } catch (error) {

      res.status(400).json({ message: error.message });

    }
  }
};

// Get OTP
module.exports.getOTP = async (req, res) => {
  const { mail } = req.body;
  const message = await sendOTP(mail);
  res.status(message ? 201 : 400).json(message.message);
};

// Confirm OTP
module.exports.conformOTP = async (req, res) => {
  const { mail, otp } = req.body;
  const { success, message } = verifyOTP(mail, otp);

  res.status(success ? 201 : 400).json(message);
};

// Update user verification
module.exports.updateVerification = async (req, res) => {
  const { phone, gender, place, uniqueId } = req.body;

  try {
    const updatedData = await User.updateOne({ _id: uniqueId }, { phone, gender, place, isVerified: true });
    res.status(200).json({ message: "User updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating user", error: error.message });
  }
};


module.exports.logoutUser = async(req,res)=>{

  const { id } = req.body

  try {

    if(id){

      res.clearCookie('userToken')

      res.status(200).json({forWord:true})

    }else{
      res.status(401).json('Somethng went wrong')
    }

    
  } catch (error) {
    res.status(500).json(error.message)
  }

}

// const removeCokkies =(res)=>{



// }

// // Get categories
// module.exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({});
//     res.status(categories.length > 0 ? 200 : 500).json({
//       mission: categories.length > 0,
//       message: categories.length > 0 ? 'successful' : 'empty categories',
//       data: categories,
//     });
//   } catch (error) {
//     res.status(500).json({ mission: false, message: error.message });
//   }
// };

// // Get collections
// module.exports.getCollections = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const categoriesNames = id ? await Collection.find({ category: id }) : null;
//     res.status(categoriesNames ? 201 : 500).json({
//       mission: Boolean(categoriesNames),
//       message: categoriesNames ? 'successful' : 'empty collection',
//       data: categoriesNames || [],
//     });
//   } catch (error) {
//     res.status(500).json({ mission: false, message: error.message });
//   }
// };

// // Get products
// module.exports.getProducts = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const products = id ? await Product.find({ category: id }) : null;
//     res.status(products ? 201 : 500).json({
//       mission: Boolean(products),
//       message: products ? 'successful' : 'empty collection',
//       data: products || [],
//     });
//   } catch (error) {
//     res.status(500).json({ mission: false, message: error.message });
//   }
// };

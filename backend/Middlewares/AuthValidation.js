const joi= require('joi');
const UserModel = require("../Models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupValidation=(req,res,next)=>{
    const Schema=joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(100).required()
    });
    const {error}=Schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"Bad Request",error
        })
    }
    next();
}

const loginValidation = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      // Step 1: Attempt to find the user by email
      const user = await UserModel.findOne({ email });
      console.log("Retrieved User:", user); // Log user information

      if (!user) {
          return res.status(403).json({
              message: "Auth failed, password or email is wrong",
              success: false
          });
      }

      // Step 2: Compare the provided password with the hashed password
      const isPassEqual = await bcrypt.compare(password, user.password);
      console.log("Password Match Result:", isPassEqual); // Log result of password comparison

      if (!isPassEqual) {
          return res.status(403).json({
              message: "Auth failed, password or email is wrong",
              success: false
          });
      }

      // Step 3: Generate JWT token
      const jwtToken = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );

      // Step 4: Return success response
      res.status(200).json({
          message: "Login successful",
          success: true,
          jwtToken,
          email,
          name: user.name
      });
  } catch (err) {
      console.error("Error during login:", err); // Log the actual error
      res.status(500).json({
          message: "Internal server error in validation",
          success: false,
          error: err.message // Include error message in response for debugging
      });
  }
};


  
module.exports={
    
    signupValidation,
    loginValidation

}
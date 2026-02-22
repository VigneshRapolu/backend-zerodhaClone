const User = require("../model/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {

    const { email, password, username, createdAt } = req.body;
      
    const existingUser = await User.findOne({ email });
       
    if (existingUser) {
      // return res.json({ message: "User already exists" });
      throw new ExpressError(409,"user already exists");
    }
    const user = await User.create({ email, password, username, createdAt });
        
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    
    
    return res.status(201).json({ message: "User signed in successfully", success: true });
     
};


module.exports.Login = async (req, res, next) => {
  
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      throw new ExpressError(404,'Incorrect password or email');
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      throw new ExpressError(404,'Incorrect password or email'); 
    }
     const token = createSecretToken(user._id);
    //  console.log("token is ",token);
    //  console.log("id is ",req.user);
     
     
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     
     
     return res.status(201).json({ message: "User logged in successfully", success: true });
    
  
}
module.exports.logout=async(req,res)=>{
  res.cookie("token", "", {
    httpOnly: false,   // same as your login
    expires: new Date(0)
  });
  res.json({ message: "Logged out successfully" });
}
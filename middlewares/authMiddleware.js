const User = require("../model/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.userVerification = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
    // console.log("cookie is:", token);

     if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ synchronous verify
    const token = authHeader.split(" ")[1];

    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(data.id);

    if (!user) {
      return res.status(401).json({ status:false });
    }
    
    req.user = user.id; // attach user
    next();            // ✅ ONLY call after everything finishes

  } 
  catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

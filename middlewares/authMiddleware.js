const User = require("../model/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// module.exports.userVerification =async  (req, res,next) => {
  
  
//   try{
//      const token = req.cookies.token
//      console.log("cookie is ",token);
     
//   if (!token) {
//     console.log("token did not exists");
    
//     return res.send("no token");
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//      return res.json({ status: false })
//     } else {
//       const user = await User.findById(data.id)
//       if (user) return req.user=user.id;
//       else return res.json({ status: false })
//     }

//   })
//   console.log("middleware passing to next function");
  
//   next();
  
//   }
//   catch(e){
//     return res.status(401).json({ message: "Invalid token" });
//   }
 
// }

module.exports.userVerification = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    // console.log("cookie is:", token);

    if (!token) {
      return res.status(401).send("No token");
    }

    // ✅ synchronous verify
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

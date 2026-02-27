require('dotenv').config();//this will add the items in os process
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const Stock=require("./schemas/StockSchema");
const csvtojson = require("csvtojson");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const ordersRoute=require("./routes/ordersRoute");
const holdingsRoute=require("./routes/holdingsRoute");
const watchListRoute=require("./routes/watchListRoute");
const ExpressError=require("./util/ExpressError");
const app=express();
// app.use(cors());
app.use(cors({
   origin: "https://zerodhaclone-dashboard-nh6z.onrender.com", // your React port
   
}));

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());



const PORT=process.env.PORT|| 8080;
const uri=process.env.MONGO_URI;
async function main() {
    await mongoose.connect(uri);
} 



  main().then(()=>{
    console.log("db connected");
    
  }).catch((e)=>{
console.log(e);

  })
app.use("/", authRoute);
app.use("/holdings",holdingsRoute);
app.use("/watchlist",watchListRoute);
app.use("/orders",ordersRoute);

app.use((req,res,next)=>{
  next(new ExpressError(404,"page not found"));
})
//error handler
app.use((err,req,res,next)=>{
    let {status=405,message="Something Went Wrong"}=err;
    res.status(status).send(message);
    // res.status(status).send(message);
})


app.listen(PORT,()=>{
    console.log("listening on port 8080");
  
    
})



















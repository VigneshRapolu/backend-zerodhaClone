const {OrderModel}=require("../model/OrderModel");
const {HoldingModel}=require("../model/HoldingsModel");
const ExpressError=require("../util/ExpressError");
module.exports.orders=async(req,res)=>{

  let newOrder=new OrderModel({
    symbol:req.body.symbol,
    qty:req.body.qty,
    price:req.body.price*req.body.qty,
    mode:req.body.mode,
    owner:req.user,
    date:Date.now()
  })
 
  
  await newOrder.save();
  //updating holding
   const isAvailable=await HoldingModel.findOneAndUpdate({symbol:req.body.symbol,owner:req.user},[{
    $set:{
      avg:{
        $divide:[
          {
            $add:[
              {
                $multiply:["$qty","$avg"]
              },
              req.body.qty*req.body.price

            ]
          },
          { $add: ["$qty", req.body.qty] }
        ]
      },
      qty:{$add:["$qty",req.body.qty]}

    }
   }],{ new: true,updatePipeline: true });
   
   //adding new one if not exists
  if(!isAvailable){
   
    const newHolding=new HoldingModel({
      symbol: req.body.symbol,
    qty: req.body.qty,
    avg: req.body.price/req.body.qty,
    
    
    owner:req.user
    })
    // console.log(newHolding);
    
    await newHolding.save();
  }
}
module.exports.getOrders=async (req,res)=>{
  // console.log("calling orders");
  
  const userOrders=await OrderModel.find({owner:req.user});
  
  // console.log("all orders",userOrders);
  
  res.send(userOrders);
}
module.exports.sellStock=async (req,res)=>{
 
  const isAvailable=await HoldingModel.findOneAndUpdate({owner:req.user,symbol:req.body.symbol,qty:{$gte:req.body.qty}},[
    {
      $set:{
        qty:{$subtract:["$qty",req.body.qty]}
      }
    }
  ],{ new: true,updatePipeline: true })
   if(!isAvailable){
   
    
    throw new ExpressError(400,"Not Enough Shares");
  }
  
  
  
  let newOrder=new OrderModel({
    symbol:req.body.symbol,
    qty:req.body.qty,
    price:req.body.price*req.body.qty,
    mode:req.body.mode,
    owner:req.user,
    date:Date.now()
  })
  await newOrder.save();
 
  
  


 
  if(isAvailable.qty==0){
    await HoldingModel.deleteOne({symbol:req.body.symbol,owner:req.user});
    return res.status(200).send("Selled the Stock");
  }
}
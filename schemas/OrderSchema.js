const {Schema} =require("mongoose");
const OrderSchema=new Schema({
    symbol:String,
    qty:Number,
    price:Number,
    mode:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    date:Date
})
module.exports={OrderSchema};
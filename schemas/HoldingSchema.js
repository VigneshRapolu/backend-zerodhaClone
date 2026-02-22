const {Schema}=require("mongoose");
const HoldingSchema=new Schema({
    symbol: String,
    qty: Number,
    avg: Number,  
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports={HoldingSchema};
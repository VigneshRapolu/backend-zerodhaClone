const {model}=require("mongoose");
const {HoldingSchema}=require("../schemas/HoldingSchema");

const HoldingModel=new model("holding",HoldingSchema);//holding wil be name of collection.
module.exports={HoldingModel};
const {model}=require("mongoose");
const {PositionsSchema}=require("../schemas/PositionsSchema");

const PositionsModel=new model("position",PositionsSchema);//holding wil be name of collection.
module.exports={PositionsModel};
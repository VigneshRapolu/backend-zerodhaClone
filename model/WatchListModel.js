const {model}=require("mongoose");
const {WatchListSchema} =require("../schemas/watchListSchema");
const WatchListModel=new model("watchlist",WatchListSchema);
module.exports={WatchListModel};
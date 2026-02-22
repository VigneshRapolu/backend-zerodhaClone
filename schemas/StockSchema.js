const mongoose = require("mongoose");
const { Schema } = mongoose;


   const StockSchema = new Schema({
    symbol: { type: String, unique: true },
    name: String,
    exchange: String,
    assetType: String,
    ipoDate: String,
    status: String


});

module.exports = mongoose.model("Stock", StockSchema);

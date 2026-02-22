const { HoldingModel}=require("../model/HoldingsModel");
module.exports.holdings=async(req,res)=>{
 let holdings=[]
 

    
  let allHoldings=await HoldingModel.find({owner:req.user});
 
        holdings=await Promise.all(
          allHoldings.map(async (holding)=>{
            const response=await fetch(`https://finnhub.io/api/v1/quote?symbol=${holding.symbol}&token=${process.env.FINNHUB_KEY}`)
        
         
         const r=await response.json();
       
            return ({
              symbol:holding.symbol,
              qty:holding.qty,
              price: r.c ?? 0,
              netChange: r.d ?? 0,
              
              percentChange:r.dp ?? 0,
              avgPrice:holding.avg ?? 0,
            })
          })
        )
        
         res.send(holdings);

 
}
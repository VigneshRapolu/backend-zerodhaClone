
module.exports.watchList=async (req,res)=>{
    let codes=["INFY","AAAU","AALG","AAME","A","AAPR","M&M","AAPL","AAPG"];

        let watchlist=await Promise.all(
            codes.map(async (code,idx)=>{
                let response=await fetch(`https://finnhub.io/api/v1/quote?symbol=${code}&token=${process.env.FINNHUB_KEY}`);
                let result=await response.json();
               
                
                return {
                    price:result.c ?? 0,
                    percentChange:result.dp ?? 0,
                    symbol:code,
                    isDown:result.dp<0,

                }
            })
        );
       
        res.send(watchlist);

}
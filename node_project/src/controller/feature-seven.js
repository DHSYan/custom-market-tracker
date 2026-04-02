const appService = require('../../appService.js');

async function marketSummaryByExchange(req, res) {

  let query = "SELECT Exchange, count(*) ,avg(CurrentPrice), avg(CurrentPrice - LastPrice) FROM Assets GROUP BY Exchange"

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, result: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}

async function marketSummaryBySector(req, res) {

  let query = "SELECT Sector, count(*) ,avg(EarningsPerShare) FROM Stocks GROUP BY Sector"

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, result: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}

// input 
//
  // { type: "Exchange" | "Sector" } 
async function marketSummary(req, res) {
  
  const { type } = req.body;

  if (type.toUpperCase() === "EXCHANGE") {
    return marketSummaryByExchange(req, res);
  } else if (type.toUpperCase() === "SECTOR") {
    return marketSummaryBySector(req, res); 
  } else {
    res.status(400).json({success: false, error: "invalid request body" });
    return
  }
}


module.exports = { marketSummaryByExchange, marketSummaryBySector , marketSummary };

const appService = require('../../appService.js');

async function findTheBestTrader(req, res) {

  let query = "SELECT Email, Performance FROM Traders WHERE Performance > (SELECT avg(Performance) FROM Traders)";

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, data: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}

async function findTheBestSector(req, res) {

  let query = "SELECT Sector, avg(EarningsPerShare) FROM Stocks GROUP BY Sector HAVING avg(EarningsPerShare) > (SELECT avg(EarningsPerShare) FROM Stocks)";

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, data: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}

// input 
//
  // { type: "Sector" | "Trader" } 
async function findTheBest(req, res) {
  
  const { type } = req.body || {};

  if (!type) {
    res.status(400).json({ success: false, error: "missing type in request body" });
    return;
  }

  if (type.toUpperCase() === "TRADER") {
    return findTheBestTrader(req, res);
  } else if (type.toUpperCase() === "SECTOR") {
    return findTheBestSector(req, res); 
  } else {
    res.status(400).json({success: false, error: "invalid request body" });
    return
  }
}


module.exports = {  findTheBest };

// feature 5 - project, dynamicReportbuilder
//

const appService = require('../../appService.js');

// input
// {
//    table: "TABLE NAME TO EXPORT",
  //  columns: [
    //  "attribute1"
    //  "attribute2"
    //  ]
  //
// }
// output, shoud be a projection of the table, with the attributse specified
// in columns 
//
  //
// this is to prevent SQL injection
// probably should extract this to some file
const allowedColumns = {
  Assets: ["TickerSymbol", "Name", "LastPrice", "CurrentPrice", "Exchange", "LastUpdate", "IsActive", "Currency", "CreatedDate"],
  Stocks: ["TickerSymbol", "Industry", "Sector", "SharesOutstanding", "EarningsPerShare"],
  Portfolio: ["CreatedDate", "Name", "Currency"],
  People: ["Email", "PhoneNumber", "Networth", "Name", "Cash"],
  Traders: ["Email", "Performance", "AverageTradeTime"],
  CEOs: ["Email", "InCompanyTime", "PublicConsensus", "PreviousRoles"],
  Reporter: ["Email", "PublicConsensus"],
  Companies: ["CompanyID", "FoundedDate", "IsPublic", "EmployeeCount"],
  TimeFrame: ["TimeFrameID", "Volume", "Time_to_time", "AverageChange"],
  Days: ["TimeFrameID", "DayOfMonth", "DayOfWeek", "IsHoliday", "Has_Months"],
  Months: ["TimeFrameID", "MonthOfYear", "Has_Years"],
  Years: ["TimeFrameID", "YearNumber"],
  NewsEvents: ["EventID", "Headline", "SentimentScore", "TimeFrameID", "Happened"],
  Contains: ["Email", "CreatedDate", "TickerSymbol", "Quantity", "PurchasePrice"],
  Buys: ["Email", "TickerSymbol", "Quantity"],
  Sells: ["Email", "TickerSymbol", "Quantity"],
  Trades: ["TickerSymbol", "CompanyID", "PublicDate", "PercentageOfCompany"],
  People_Has_Portfolio: ["CreatedDate", "Email"],
  Operates: ["Email", "CompanyID", "IsFounder", "InOfficeTime"],
  Owns: ["Email", "CompanyID", "Percentage"],
  Impacts: ["TickerSymbol", "EventID", "PreEventPrice", "PostEventPrice"],
  OnRelation: ["TickerSymbol", "EventID"],
  Reports: ["Email", "EventID"]
};
async function dynamicReportBuilder(req, res) {

  const { table, columns }  = req.body;

  if (!allowedColumns[table]) {
    res.status(400).json({ success: false, error: "table invalid" });
    return
  }


  for (let i = 0; i < columns.length; i++) {
    if (!allowedColumns[table].includes(columns[i])) {
      res.status(400).json({ success: false, error: "one of the column invalid" });
      return
    }
  }
  // all columns are valid

  let query = "SELECT ";

  for (let i = 0; i < columns.length; i++) {
    if (i != 0) {
      query += ", ";
    }
    query += columns[i];
  }


  query += " FROM " + table;

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, result: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}

module.exports  = { dynamicReportBuilder };

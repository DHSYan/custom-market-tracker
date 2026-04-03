const appService = require('../../appService.js');

async function findPeopleThatTradeEveryCompany(req, res) {

  let query = "SELECT p.Email FROM People p WHERE NOT EXISTS ( SELECT c.CompanyID FROM Companies c WHERE c.IsPublic = 1 AND NOT EXISTS ( SELECT o.Email FROM Owns o WHERE o.Email = p.Email AND o.CompanyID = c.CompanyID))";

  await appService.withOracleDB(async (connection) => {
    const result = await connection.execute(query);
    res.status(200).json({ success: true, data: result.rows });
    return
  }).catch(() => {
    res.status(500).json({ success: false, error: "internal error" });
    return
  });
}



module.exports = {  findPeopleThatTradeEveryCompany };

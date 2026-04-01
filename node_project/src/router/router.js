const express = require('express');
const appService = require('../../appService.js');

const router = express.Router();

const controller = require("../controller/controller.js");
const persist = require("../persist/persist.js");

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

// INSERT (refactored logic)
router.put('/people/:email/portfolio/assets', async (req, res) => {
    return controller.addStockToPortfolioRequest(req, res);
});

router.post("/filter/assets", async (req, res) => {
  // filter here is going to be an array of propositional statemnets
  // { column: "name", operator: "=", value: "target" }
  // or 
  // { logic: "or" } 
  const filter = req.body;

  const result =  await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Assets WHERE Name = "TSLA"');
        return result.rows;
    }).catch(() => {
        return [];
    });


  // should return an array of the tuples from the assets table
  return res.status(200).json({ success: true, result: result });
})


module.exports = router;

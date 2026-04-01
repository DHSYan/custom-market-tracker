const express = require('express');
const appService = require('../../appService.js');

const router = express.Router();

const featureOne = require("../controller/controller.js");
const featureTwo = require("../controller/feature-update.js");
const featureThree = require("../controller/feature-delete.js");
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
    return featureOne.addStockToPortfolioRequest(req, res);
});

// UPDATE PEOPLE
router.put('people/:email', async (req, res) => {
   return featureTwo.updatePersonPortfolioRequest(req, res); 
}); 

// UPDATE ASSETS 
router.put('/assets/:tickerSymbol', async (req, res) => {
   return featureTwo.updateAssetRequest(req, res); 
}); 

// DELETE PEOPLE
router.delete('', async (req, res) => {
    return featureThree.deletePersonRequest(req, res); 
});

// DELETE PORTFOLIO
router.delete('', async (req, res) => {
    return featureThree.deletePortfolioRequest(req, res); 
});

module.exports = router;

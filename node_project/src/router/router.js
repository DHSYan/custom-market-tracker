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

router.put('/people/:email/portfolio/assets', async (req, res) => {
    const { email: urlEmail } = req.params;
    const { email, createdDate, tickerSymbol, quantity, purchasePrice } = req.body || {};

    // keep the current route semantics; this is the controller method for first feature
    const effectiveEmail = email || urlEmail;

    if (!effectiveEmail || !createdDate || !tickerSymbol || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(purchasePrice) || purchasePrice < 0) {
        return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    }

    try {
        // Helper to implement in appService or portfolio service:
        // insertContains({ email, createdDate, tickerSymbol, quantity, purchasePrice })
        const insertResult = await appService.insertContains({
            email: effectiveEmail,
            createdDate,
            tickerSymbol,
            quantity,
            purchasePrice
        });

        if (insertResult) {
            return res.status(201).json({ success: true });
        }

        return res.status(500).json({ success: false, error: 'Insert failed' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message || 'Internal server error' });
    }
});

module.exports = router;

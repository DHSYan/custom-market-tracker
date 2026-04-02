
// FEATURE 2: UPDATE 


// 
async function updatePersonPortfolioRequest(req, res) {
    const urlEmail = req.params?.email;

    const {email, newNetWorth, newCash} = req.body; 
    const effectiveEmail = email || urlEmail; 

    if (!effectiveEmail || !newNetWorth || !newCash) {
        return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    }

    try { 
        const {updatePeople} = require('../../appService.js');
        const result = await updatePeople({
            email: effectiveEmail,
            newNetWorth, 
            newCash
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}

async function updateAssetRequest(req, res) {
    const {ticker, exchange, activeStatus, priceUpdate} = req.body; 

    if (!ticker || !exchange || !(activeStatus === 0 || activeStatus === 1) || !priceUpdate) {
        return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    }
    try { 
        const {updateAssets} = require('../../appService.js');
        const result = await updateAssets({
            ticker,
            exchange, 
            activeStatus, 
            priceUpdate 
        });
        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}

module.exports = {updatePersonPortfolioRequest, updateAssetRequest};
// feature 6 - join 

// controllers
// Input: email 
async function joinPeopleContainsAssetRequest(req, res) {
    const email = req.params?.email;

    if (!email) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    
    try { 
        const {joinHoldings} = require('../../appService.js');
        const result = await joinHoldings({
            email: email,
        });

        if (result) return res.status(201).json({ success: true, data: result });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error'});
    }

}

// Input: company id 
async function joinOwnsPeopleCompanyRequest(req, res) {
    const compID = req.params?.companyId;

    if (!compID) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });

    try { 
        const {joinInvestors} = require('../../appService.js');
        const result = await joinInvestors({
            companyId: compID,
        });

        if (result) return res.status(201).json({ success: true, data: result });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error'});
    }

}

module.exports = {joinPeopleContainsAssetRequest, joinOwnsPeopleCompanyRequest};
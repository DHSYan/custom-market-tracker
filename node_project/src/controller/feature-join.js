// feature 6 - join 

// controllers
// Input: email 
async function joinPeopleContainsAssetRequest(req, res) {
    const urlEmail = req.params?.email;

    const effectiveEmail = email || urlEmail; 

    if (!effectiveEmail) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    
    try { 
        const {joinHoldings} = require('../../appService.js');
        const result = await joinHoldings({
            email: effectiveEmail,
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error'});
    }

}

// Input: company id 
async function joinOwnsPeopleCompanyRequest(req, res) {
    const compID = req.params?.companyId;
    const effectiveCompanyId = companyId || compID; 

    if (!effectiveCompanyId) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });

    try { 
        const {joinInvestors} = require('../../appService.js');
        const result = await joinInvestors({
            companyId: effectiveCompanyId,
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error'});
    }

}

module.exports = {joinPeopleContainsAssetRequest, joinOwnsPeopleCompanyRequest};
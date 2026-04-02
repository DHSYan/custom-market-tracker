// FEATURE 3: DELETE 

// Input: email 
async function deletePersonRequest(req, res) {
    const urlEmail = req.params?.email;

    const {email} = req.body; 
    const effectiveEmail = email || urlEmail; 

    if (!effectiveEmail) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    
    try { 
        const {deletePeople} = require('../../appService.js');
        const result = await deletePeople({
            email: effectiveEmail,
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error'});
    }
}

// Input: portfolio created date 
async function deletePortfolioRequest(req, res) {
    const date = req.params?.createdDate;
    const {createdDate} = req.body; 
    const effectiveDate = createdDate || date; 

    if (!effectiveDate) return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
     
    try { 
        const {deletePortfolio} = require('../../appService.js');
        const result = await deletePeople({
            createdDate: effectiveDate,
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Update failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}

module.exports = {deletePersonRequest, deletePortfolioRequest};


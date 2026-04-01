
// insert controller 
async function addStockToPortfolioRequest(req, res) {
    const urlEmail = req.params?.email;
    const {email, createdDate, tickerSymbol, quantity, purchasePrice} = req.body;
    const effectiveEmail = email || urlEmail;

    if (!effectiveEmail || !createdDate || !tickerSymbol ||  quantity <= 0 ||  purchasePrice < 0) {
        return res.status(400).json({ success: false, error: 'Missing or invalid required fields' });
    }

    try {
        // Need a persist helper function to fetch people object (if available from persistence layer).
        // Example: const people = persist.getPeople(effective)
        // implementation assumes function getPeople(email) that returns the people object for the given email.

        // call service helper 
        const {insertContains} = require('../../appService.js');
        const result = await insertContains({
            email: effectiveEmail,
            createdDate,
            tickerSymbol,
            quantity,
            purchasePrice
        });

        if (result) return res.status(201).json({ success: true });
        return res.status(500).json({ success: false, error: 'Insert failed' });
        
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}

module.exports = {addStockToPortfolioRequest};

//
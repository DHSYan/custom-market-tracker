// feature 8 

// controllers 
async function havingEPSGreaterThanRequest(req, res) {

    const threshold = parseFloat(req.query.threshold);
     if (!threshold || isNaN(threshold)) {
        return res.status(400).json({ success: false, error: 'Missing or invalid threshold' });
    }

    try {
        const {epsGreaterThan} = require('../../appService.js');
        const result = await epsGreaterThan({threshold});

        return res.status(200).json({ success: true, data: result });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
}

module.exports = {havingEPSGreaterThanRequest};



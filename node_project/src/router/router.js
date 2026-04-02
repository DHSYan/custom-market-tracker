const express = require('express');
const appService = require('../../appService.js');

const router = express.Router();

const featureOne = require("../controller/controller.js");
const featureTwo = require("../controller/feature-update.js");
const featureThree = require("../controller/feature-delete.js");
const featureSix = require ("../controller/feature-join.js"); 
const featureEight = require("../controller/feature-having.js");
const persist = require("../persist/persist.js");
const { autoCommit } = require('oracledb');

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
// Feature 1
router.put('/people/:email/portfolio/assets', async (req, res) => {
    return featureOne.addStockToPortfolioRequest(req, res);
});

// Feature 4 
// UPDATE PEOPLE
router.put('people/:email', async (req, res) => {
   return featureTwo.updatePersonPortfolioRequest(req, res); 
}); 

// UPDATE ASSETS 
router.put('/assets/:tickerSymbol', async (req, res) => {
   return featureTwo.updateAssetRequest(req, res); 
}); 
router.post("/filter/assets", async (req, res) => {
  // filter here is going to be an array of propositional statemnets
  // { column: "name", operator: "=", value: "target" }
  // or 
  // { logic: "or" } 
  const filter = req.body;

  let query = "SELECT * FROM Assets";

  if (filter.length > 0) {
    query = query.concat(" WHERE ");
  }


  let binds = {};
  let bindIndex = 0;

  for (let i = 0; i < filter.length; i++) {
    if (filter[i].column) { // then it's a column thing
      const { column, operator, value } = filter[i];
      
      query += column + " " + operator + " :val" + bindIndex;
      binds["val" + bindIndex] = value;
      bindIndex++;

    } else {
      const { logic } = filter[i];

      query = query.concat(" " + logic + "  ");
    }
  }

  const result =  await appService.withOracleDB(async (connection) => {
        const result = await connection.execute(query, binds);
        return result.rows;
    }).catch(() => {
        return [];
    });


  // should return an array of the tuples from the assets table
  return res.status(200).json({ success: true, result: result });
})


// DELETE PEOPLE
router.delete('/people/:email', async (req, res) => {
    return featureThree.deletePersonRequest(req, res); 
});

// DELETE PORTFOLIO
router.delete('/portfolios/:createdDate', async (req, res) => {
    return featureThree.deletePortfolioRequest(req, res); 
});

// JOIN (trader holdings view) 
router.get('/holdings/:email', async (req, res) => {
    return featureSix.joinPeopleContainsAssetRequest(req, res);
});

// JOIN (News impact rows)
router.get('/news-impact/:companyId', async (req, res) => {
    return featureSix.joinOwnsPeopleCompanyRequest(req, res);
});

// HAVING (EPS greater than threshold) 
router.get('/companies/eps-greater-than', async (req, res) => {
    return featureEight.epsGreaterThanRequest(req, res);
});

module.exports = router;

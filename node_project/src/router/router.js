const express = require('express');
const appService = require('../../appService.js');

const router = express.Router();

const featureOne = require("../controller/controller.js");
const featureTwo = require("../controller/feature-update.js");
const featureThree = require("../controller/feature-delete.js");
const featureSix = require ("../controller/feature-join.js"); 
const featureEight = require("../controller/feature-having.js");
const featureFive = require("../controller/feature-projection.js");
const featureSeven = require("../controller/feature-seven.js");
const featureNine = require("../controller/feature-nine.js");
const featureTen = require("../controller/feature-ten.js");


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

// Feature 2
// UPDATE PEOPLE
router.put('/people/:email', async (req, res) => {
   return featureTwo.updatePersonPortfolioRequest(req, res); 
}); 

// UPDATE ASSETS 
router.put('/assets/:tickerSymbol', async (req, res) => {
   return featureTwo.updateAssetRequest(req, res); 
}); 

// Feature 4 
router.post("/filter/assets", async (req, res) => {
  // filter here is going to be an array of propositional statemnets
  // { column: "name", operator: "=", value: "target" }
  // or 
  // { logic: "or" } 
  const { col1, val1, logic, col2, val2 } = req.body;

  const allowedColumns = ["Exchange", "Currency"];
  const allowedLogic = ["AND", "OR"];

  if (!allowedColumns.includes(col1) || !allowedColumns.includes(col2) || !allowedLogic.includes((logic || "").toUpperCase()) ||
      val1 === undefined || val1 === null ||
      val2 === undefined || val2 === null
  ) {
    return res.status(400).json({ success: false, error: "Invalid search input" });
  }

  const filter = [
    { column: col1, operator: "=", value: val1 },
    { logic: logic.toUpperCase() },
    { column: col2, operator: "=", value: val2 }
  ];

  let query = "SELECT * FROM Assets";

  if (filter.length > 0) {
    query = query.concat(" WHERE ");
  }


  // https://node-oracledb.readthedocs.io/en/latest/user_guide/sql_execution.html
  const binds = {}; // change to constant 
  let bindIndex = 0;  

  for (let i = 0; i < filter.length; i++) {
    if (filter[i].column) { // then it's a column thing
      const { column, operator, value } = filter[i];
      
      query += column + " " + operator + " :val" + bindIndex; // the i makes sure the :vali 
      binds["val" + bindIndex] = value; // dynamically build the array
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
  return res.status(200).json({ success: true, data: result });
})


// DELETE PEOPLE (3)
router.delete('/people/:email', async (req, res) => {
    return featureThree.deletePersonRequest(req, res); 
});

// DELETE PORTFOLIO
router.delete('/portfolios/:createdDate', async (req, res) => {
    return featureThree.deletePortfolioRequest(req, res); 
});

// JOIN (trader holdings view) (6)
router.get('/holdings/:email', async (req, res) => {
    return featureSix.joinPeopleContainsAssetRequest(req, res);
});

// JOIN (News impact rows)
router.get('/news-impact/:companyId', async (req, res) => {
    return featureSix.joinOwnsPeopleCompanyRequest(req, res);
});

// HAVING (EPS greater than threshold) (8)
router.get('/companies/eps-greater-than', async (req, res) => {
    return featureEight.havingEPSGreaterThanRequest(req, res);
});


// FEATURE 5 
router.post('/dynamic-report-builder', async (req, res) => {
    return featureFive.dynamicReportBuilder(req, res);
});

// FEATURE 5 (metadata) 
router.get('/projection-metadata', async (req, res) => {
    return featureFive.getProjectionMetadata(req, res);
});

// feature 7 
router.post("/market-summary-by-exchange", async (req, res) => {
    return featureSeven.marketSummary(req, res);
})

// feature 9
router.post("/find-the-best", async (req, res) => {
    return featureNine.findTheBest(req, res);
})

// feature 10 
router.get("/find-trades-that-trades-all-company", async (req, res) => {
  return featureTen.findPeopleThatTradeEveryCompany(_, res);
})

module.exports = router;

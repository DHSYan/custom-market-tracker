/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

// Fetches data from the People table and displays it.
async function fetchAndDisplayPeople() {
    const tableElement = document.getElementById('peopleTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/get-people', {
        method: 'GET'
    });

    const responseData = await response.json();
    const peopleContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    peopleContent.forEach(person => {
        const row = tableBody.insertRow();
        person.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// for tab navigation on each query page
function openTab(event, tabId) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(tab => {
        tab.style.display = "none";
    });

    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(tabId).style.display = "block";
    event.currentTarget.classList.add("active");
}

// query 1. insert: inserts a new asset into a portfolio
async function buyAsset(event) {
    event.preventDefault();

    const emailValue = document.getElementById('buyEmail').value;
    const dateValue = document.getElementById('buyDate').value;
    const tickerValue = document.getElementById('buyTicker').value;
    const qtyValue = document.getElementById('buyQty').value;
    const priceValue = document.getElementById('buyPrice').value;
    
    const response = await fetch(`/people/${emailValue}/portfolio/assets`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            createdDate: dateValue,
            tickerSymbol: tickerValue,
            quantity: qtyValue,
            purchasePrice: priceValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('buyMsg');

    if (responseData.success) {
        messageElement.textContent = "Asset purchased successfully!";
    } else {
        messageElement.textContent = "Error purchasing asset.";
    }
}

// query 1. insert: records a transaction for a person
async function recordTransaction(event) {
    event.preventDefault();

    const emailValue = document.getElementById('txEmail').value;
    const dateValue = document.getElementById('txDate').value;
    const tickerValue = document.getElementById('txTicker').value;
    const qtyValue = document.getElementById('txQty').value;
    const priceValue = document.getElementById('txPrice').value;
    
    const response = await fetch(`/people/${emailValue}/portfolio/assets`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            createdDate: dateValue,
            tickerSymbol: tickerValue,
            quantity: qtyValue,
            purchasePrice: priceValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('txMsg');

    if (responseData.success) {
        messageElement.textContent = "Transaction recorded successfully!";
    } else {
        messageElement.textContent = "Error recording transaction.";
    }
}

// query 2. update: updates names and information in the people table
async function updatePerson(event) {
    event.preventDefault();

    const emailValue = document.getElementById('updEmail').value;
    const networthValue = document.getElementById('updNet').value;
    const cashValue = document.getElementById('updCash').value;
    const phoneValue = document.getElementById('updPhone').value;
    
    const response = await fetch(`/people/${emailValue}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            newNetWorth: networthValue,
            newCash: cashValue,
            newPhone: phoneValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updPersonMsg');

    if (responseData.success) {
        messageElement.textContent = "Person updated successfully!";
    } else {
        messageElement.textContent = "Error updating person.";
    }
}

// query 2. update: updates asset for maintenance
async function updateAsset(event) {
    event.preventDefault();

    const tickerValue = document.getElementById('updTicker').value;
    const exchangeValue = document.getElementById('updExchange').value;
    const statusValue = parseInt(document.getElementById('updStatus').value); 
    const priceValue = document.getElementById('updPrice').value;
    
    const response = await fetch(`/assets/${tickerValue}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker: tickerValue,
            exchange: exchangeValue,
            activeStatus: statusValue, 
            priceUpdate: priceValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updAssetMsg');

    if (responseData.success) {
        messageElement.textContent = "Asset updated successfully!";
    } else {
        messageElement.textContent = "Error updating asset.";
    }
}

// query 3. delete: removes records from the people table
async function deletePerson(event) {
    event.preventDefault();

    const emailValue = document.getElementById('delEmail').value;
    
    const response = await fetch(`/people/${emailValue}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('delPersonMsg');

    if (responseData.success) {
        messageElement.textContent = "Person deleted successfully!";
    } else {
        messageElement.textContent = "Error deleting person.";
    }
}

// query 3. delete: removes portfolio from creation date
async function deletePortfolio(event) {
    event.preventDefault();

    const dateValue = document.getElementById('delDate').value;
    
    const response = await fetch(`/portfolios/${dateValue}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            createdDate: dateValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('delPortfolioMsg');

    if (responseData.success) {
        messageElement.textContent = "Portfolio deleted successfully!";
    } else {
        messageElement.textContent = "Error deleting portfolio.";
    }
}

// query 4. selection: filter function for the search with and/or
async function searchAssets(event) {
    event.preventDefault();

    const col1 = document.getElementById('selCol1').value;
    const val1 = document.getElementById('selVal1').value;
    const logic = document.getElementById('selLogic').value;
    const col2 = document.getElementById('selCol2').value;
    const val2 = document.getElementById('selVal2').value;

    const response = await fetch('/search-assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            col1,
            val1,
            logic,
            col2,
            val2
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('searchMsg');
    const tableElement = document.getElementById('searchResultsTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Search successful!";
        
        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach((field, index) => {
                const td = tr.insertCell(index);
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Search failed.";
    }
}

// query 5. projection: multiselect checkboxes that then fetches report data
async function generateAssetReport(event) {
    event.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="columns"]:checked');
    const selectedColumns = [];
    checkboxes.forEach((cb) => {
        selectedColumns.push(cb.value);
    });

    if (selectedColumns.length === 0) {
        alert("Please select at least one column.");
        return;
    }

    const response = await fetch('/project-assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            columns: selectedColumns
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('reportMsg');
    const headerRow = document.getElementById('reportHeader');
    const tableElement = document.getElementById('reportTable');
    const tableBody = tableElement.querySelector('tbody');
    
    if (headerRow) {
        headerRow.innerHTML = '';
    }

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Report generated successfully.";

        selectedColumns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });

        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach(field => {
                const td = tr.insertCell();
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error generating report.";
    }
}

// query 6. join: joins trader holdings into one table before viewing
async function viewHoldings(event) {
    event.preventDefault();
    const emailValue = document.getElementById('joinEmail').value;
    
    const response = await fetch(`/trader-holdings?email=${encodeURIComponent(emailValue)}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('joinMsg');
    const tableElement = document.getElementById('joinTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Displaying holdings:";

        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach((field, index) => {
                const td = tr.insertCell(index);
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Could not find holdings.";
    }
}

// query 7. group by: aggregates summary stats for market
async function fetchMarketSummary() {
    const response = await fetch('/market-summary', {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('groupMsg');
    const tableElement = document.getElementById('groupTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Summary generated successfully.";

        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach((field, index) => {
                const td = tr.insertCell(index);
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Could not generate summary.";
    }
}

// query 8. having: filter exchanges based on average price performance 
async function filterCompaniesByEPS(event) {
    event.preventDefault();
    const thresholdValue = document.getElementById('epsThreshold').value;
    
    const response = await fetch(`/companies/eps-greater-than?threshold=${thresholdValue}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('epsMsg');
    const tableElement = document.getElementById('epsTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Displaying high EPS companies.";
        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach(field => {
                const td = tr.insertCell();
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error fetching companies.";
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("buyAssetForm").addEventListener("submit", buyAsset);
    document.getElementById("recordTransactionForm").addEventListener("submit", recordTransaction);
    document.getElementById("updatePersonForm").addEventListener("submit", updatePerson);
    document.getElementById("updateAssetForm").addEventListener("submit", updateAsset);
    document.getElementById("deletePersonForm").addEventListener("submit", deletePerson);
    document.getElementById("deletePortfolioForm").addEventListener("submit", deletePortfolio);
    document.getElementById("searchAssetsForm").addEventListener("submit", searchAssets);
    document.getElementById("assetReportForm").addEventListener("submit", generateAssetReport);
    document.getElementById("joinForm").addEventListener("submit", viewHoldings);
    document.getElementById("buttonGroup").addEventListener("click", fetchMarketSummary);
    document.getElementById("epsFilterForm").addEventListener("submit", filterCompaniesByEPS);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayPeople();
}
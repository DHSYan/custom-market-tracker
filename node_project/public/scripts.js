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
    
    const response = await fetch(`/people/${emailValue}/portfolio/assets`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            createdDate: document.getElementById('buyDate').value,
            tickerSymbol: document.getElementById('buyTicker').value,
            quantity: document.getElementById('buyQty').value,
            purchasePrice: document.getElementById('buyPrice').value
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
    
    const response = await fetch(`/people/${emailValue}/portfolio/assets`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            createdDate: document.getElementById('txDate').value,
            tickerSymbol: document.getElementById('txTicker').value,
            quantity: document.getElementById('txQty').value,
            purchasePrice: document.getElementById('txPrice').value
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
    
    const response = await fetch(`/people/${emailValue}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            newNetWorth: document.getElementById('updNet').value,
            newCash: document.getElementById('updCash').value,
            newPhone: document.getElementById('updPhone').value
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
    
    const response = await fetch(`/assets/${tickerValue}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ticker: tickerValue,
            exchange: document.getElementById('updExchange').value,
            activeStatus: parseInt(document.getElementById('updStatus').value), 
            priceUpdate: document.getElementById('updPrice').value
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
        body: JSON.stringify({ email: emailValue })
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
        body: JSON.stringify({ createdDate: dateValue })
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

    const response = await fetch('/filter/assets', {
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
let projectionMetadata = {};
let selectedReportColumns = [];
let lastReportColumns = [];
let lastReportRows = [];
async function generateAssetReport(event) {
    event.preventDefault();

    const tableName = document.getElementById('reportTableSelect').value;
    const selectedColumns = [...selectedReportColumns];

    if (selectedColumns.length === 0) {
        alert("Please select at least one column.");
        return;
    }

    const response = await fetch('/dynamic-report-builder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            table: tableName,
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

    // throw error message instead of success (nobody cares if it works lol)
    if (!responseData.success) {
        messageElement.textContent = responseData.error || "Error generating report.";
        return;
    }

    lastReportColumns = selectedColumns;
    lastReportRows = responseData.data || []; // if array is undefined

        selectedColumns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            headerRow.appendChild(th);
        });

        lastReportRows.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach(field => {
                const td = tr.insertCell();
                td.textContent = field;
            });
        });
} 

// CSV export function 
function exportReportCsv() {
    if (!lastReportColumns.length || !lastReportRows.length) {
        alert("Generate a report before exporting.");
        return;
    }

    const escapeCsv = (v) => {
        const s = String(v ?? "");
        return '"' + s.replace(/"/g, '""') + '"';
    };

    const lines = [];
    lines.push(lastReportColumns.map(escapeCsv).join(','));
    lastReportRows.forEach(row => {
        lines.push(row.map(escapeCsv).join(','));
    });

    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dynamic_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// feature 5: pick columns 
function renderColumnPicker(tableName) {
    const container = document.getElementById('reportColumnsContainer');
    const orderedList = document.getElementById('selectedColumnsOrder');
    const cols = projectionMetadata[tableName] || [];

    container.innerHTML = '';
    orderedList.innerHTML = '';
    selectedReportColumns = [];

    cols.forEach((col) => {
        const label = document.createElement('label');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = col;

        cb.addEventListener('change', () => {
            if (cb.checked) {
                selectedReportColumns.push(col);
            } else {
                selectedReportColumns = selectedReportColumns.filter(c => c !== col);
            }
            renderSelectedOrder();
        });

        label.appendChild(cb);
        label.appendChild(document.createTextNode(' ' + col));
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

// render function for feature 5
function renderSelectedOrder() {
    const orderedList = document.getElementById('selectedColumnsOrder');
    orderedList.innerHTML = '';

    selectedReportColumns.forEach((col, idx) => {
        const li = document.createElement('li');
        li.textContent = col + ' ';

        const upBtn = document.createElement('button');
        upBtn.type = 'button';
        upBtn.textContent = '^';
        upBtn.disabled = idx === 0;
        upBtn.onclick = () => {
            const temp = selectedReportColumns[idx - 1];
            selectedReportColumns[idx - 1] = selectedReportColumns[idx];
            selectedReportColumns[idx] = temp;
            renderSelectedOrder();
        };

        const downBtn = document.createElement('button');
        downBtn.type = 'button';
        downBtn.textContent = 'v';
        downBtn.disabled = idx === selectedReportColumns.length - 1;
        downBtn.onclick = () => {
            const temp = selectedReportColumns[idx + 1];
            selectedReportColumns[idx + 1] = selectedReportColumns[idx];
            selectedReportColumns[idx] = temp;
            renderSelectedOrder();
        };

        li.appendChild(upBtn);
        li.appendChild(downBtn);
        orderedList.appendChild(li);
    });
}

async function loadProjectionMetadata() {
    const response = await fetch('/projection-metadata', { method: 'GET' });
    const responseData = await response.json();
    if (!responseData.success) return;
    // !!! test later to this actually populates UI !!!
    projectionMetadata = responseData.data || {};
    // 
    const tableSelect = document.getElementById('reportTableSelect');
    renderColumnPicker(tableSelect.value);

    tableSelect.addEventListener('change', () => {
        renderColumnPicker(tableSelect.value);
    });
}
// error handler for above method 
loadProjectionMetadata().catch((err) => {
    console.error("Failed to load projection metadata:", err);
});

// query 6. join: joins trader holdings into one table before viewing
async function viewTraderHoldings(event) {
    event.preventDefault();
    const emailValue = document.getElementById('joinEmail').value;
    
    const response = await fetch(`/holdings/${emailValue}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('joinHoldingsMsg');
    const tableElement = document.getElementById('holdingsTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Displaying trader holdings.";
        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach(field => {
                const td = tr.insertCell();
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error fetching holdings.";
    }
}

// query 6. join: view company investors of a given companyID
async function viewCompanyInvestors(event) {
    event.preventDefault();
    const compIdValue = document.getElementById('joinCompId').value;
    
    const response = await fetch(`/news-impact/${compIdValue}`, {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('joinInvestorsMsg');
    const tableElement = document.getElementById('investorsTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    if (responseData.success) {
        messageElement.textContent = "Displaying company investors.";
        responseData.data.forEach(row => {
            const tr = tableBody.insertRow();
            row.forEach(field => {
                const td = tr.insertCell();
                td.textContent = field;
            });
        });
    } else {
        messageElement.textContent = "Error fetching investors.";
    }
}

// query 7. group by: aggregates summary stats for market
async function fetchMarketSummary() {
    const response = await fetch('/market-summary-by-exchange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // add toggle for sector if needed here 
        body: JSON.stringify({ type: 'EXCHANGE' })
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

// query 9. nested aggregation: find the best performing traders and sectors 
async function findBestPerformance(type) {
    const isTrader = type.toUpperCase() === 'TRADER';
    const msgEl = document.getElementById(isTrader ? 'nestedTradersMsg' : 'nestedSectorsMsg');
    const tableEl = document.getElementById(isTrader ? 'nestedTradersTable' : 'nestedSectorsTable');
    const tbody = tableEl.querySelector('tbody');

    msgEl.textContent = 'Loading...';
    tbody.innerHTML = '';

    try {
        const response = await fetch('/find-the-best', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type })
        });
        const responseData = await response.json();

        if (responseData.success) {
            const rows = responseData.data;
            if (rows.length === 0) {
                msgEl.textContent = 'No results found.';
            } else {
                msgEl.textContent = '';
                rows.forEach(row => {
                    const tr = document.createElement('tr');
                    row.forEach(cell => {
                        const td = document.createElement('td');
                        td.textContent = cell !== null ? cell : 'N/A';
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });
            }
        } else {
            msgEl.textContent = 'Error: ' + (responseData.error || 'Unknown error');
        }
    } catch (err) {
        msgEl.textContent = 'Request failed.';
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
    document.getElementById("viewHoldingsForm").addEventListener("submit", viewTraderHoldings);
    document.getElementById("viewInvestorsForm").addEventListener("submit", viewCompanyInvestors);
    document.getElementById("buttonGroup").addEventListener("click", fetchMarketSummary);
    document.getElementById("epsFilterForm").addEventListener("submit", filterCompaniesByEPS);
    document.getElementById("btnAboveAvgSectors").addEventListener("click", () => findBestPerformance('SECTOR'));
    document.getElementById("btnRegionalTraders").addEventListener("click", () => findBestPerformance('TRADER'));
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayPeople();
}
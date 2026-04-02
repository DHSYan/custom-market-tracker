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

// inserts new records into the people table
async function insertPerson(event) {
    event.preventDefault();

    const emailValue = document.getElementById('insEmail').value;
    const nameValue = document.getElementById('insName').value;
    const networthValue = document.getElementById('insNet').value;
    const cashValue = document.getElementById('insCash').value;
    const phoneValue = document.getElementById('insPhone').value;

    const response = await fetch('/insert-person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            name: nameValue,
            networth: networthValue,
            cash: cashValue,
            phone: phoneValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// query 2. update: updates names and information in the people table
async function updatePerson(event) {
    event.preventDefault();

    const emailValue = document.getElementById('updEmail').value;
    const networthValue = document.getElementById('updNet').value;
    const cashValue = document.getElementById('updCash').value;
    const phoneValue = document.getElementById('updPhone').value;

    const response = await fetch('/update-person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue,
            networth: networthValue,
            cash: cashValue,
            phone: phoneValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updMsg');

    if (responseData.success) {
        messageElement.textContent = "Person updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating data!";
    }
}

// query 3. delete: removes records from the people table
async function deletePerson(event) {
    event.preventDefault();

    const emailValue = document.getElementById('delEmail').value;

    const response = await fetch('/delete-person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('delMsg');

    if (responseData.success) {
        messageElement.textContent = "Person deleted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error deleting person!";
    }
}

// --- End of provided sample code ---

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

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    document.getElementById("insertPersonForm").addEventListener("submit", insertPerson);
    document.getElementById("updatePersonForm").addEventListener("submit", updatePerson);
    document.getElementById("deletePersonForm").addEventListener("submit", deletePerson);
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayPeople();
}
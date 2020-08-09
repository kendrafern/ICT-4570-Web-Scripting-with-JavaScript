// Kendra Brauer
// ICT-4570-1 Webscripting with JavaScript
// Week 8 Assignment 6: AJAX and the President
// js/assignment6.js


// Leverage the Fetch API to retrieve resource
async function getPresidents() {
    let url = 'https://schwartzcomputer.com/ICT4570/Resources/USPresidents.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Query Data from AJAX JSON File
async function queryData() {
    "use strict";
    var result = await getPresidents();
    console.log(result);
    var presidents = result.presidents.president;
    var input = document.getElementById('input');
    var regex = new RegExp(input.value, "i");

    return presidents.filter(function (president) {
        console.log("President", president);
        var presidentialTrait;
        for (var trait in president) {
            presidentialTrait = president[trait];
            if (trait === "party" || trait === "term") {
                continue;
            }
            if (regex.test(presidentialTrait)) {
                return true;
            }
        }
        return false;
    });
}

//Create Table Rows
async function createRows() {
    "use strict";
    clearForm();
    var table = document.getElementById("presidentTable");
    var presidents = await queryData();
    console.log(presidents);
    var president;
    var row;
    var number;
    var name;
    var birthday;
    var tookOffice;
    var leftOffice;
    var i;

    for (i = 0; i < presidents.length; i++) {
        row = table.insertRow(i);

        president = presidents[i];

        number = row.insertCell();
        number.appendChild(document.createTextNode(president.number));

        name = row.insertCell();
        name.appendChild(document.createTextNode(president.name));

        birthday = row.insertCell();
        birthday.appendChild(document.createTextNode(president.date));

        tookOffice = row.insertCell();
        tookOffice.appendChild(document.createTextNode(president.took_office));

        leftOffice = row.insertCell();
        leftOffice.appendChild(document.createTextNode(president.left_office));
    }
}

// Clear Form
function clearForm() {
    "use strict";
    var input = document.getElementById('input');
    var table = document.getElementById("presidentTable");
    table.innerHTML = "";
    //input.value = "";
}

function init() {
    "use strict";
    document.onload = createRows();
    document.getElementById("searchButton").addEventListener('click', createRows);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            createRows();
            event.preventDefault();
        }
    });
    document.getElementById("clearButton").addEventListener('click', clearForm);
}
window.onload = init();

// from data.js
var tableData = data;

// POPULATE TABLE WITH SIGHTING DATA FROM DATA.JS

function populateTable() {

    // Get a reference to the table body
    var tbody = d3.select("tbody");

    // Loop through 'data' using forEach function
    data.forEach((sightingReport) => {

        // Use d3 to append one table row for each sighting report object
        var row = tbody.append("tr");

        // Use 'Object.entries' loop through each sighting report key and value
        Object.entries(sightingReport).forEach(([key,value]) => {

            // Use d3 to append a cell to the row for each value in the sighting report object
            var cell = row.append("td");

            // Use d3 to update each cell's text with the value in the sighting report
            cell.text(value);

        });
    });
};

// Run function to populate the table in entirety
populateTable();

// DYNAMIC SELECT MENU (STATIC DATA)

// object literal holding data for option elements
var usa = [ 
            {text: 'Alaska',
            value: 'ak'},
            {text:'Alabama',
            value:'al'},
            {text:'Arkansas',
            value:'ar'},
            {text:'Arizona',
            value:'az'},
            {text:'California',
            value:'ca'},
            {text:'Colorado',
            value:'co'},
            {text:'Connecticut',
            value:'ct'},
            {text:'Florida',
            value:'fl'},
            {text:'Georgia',
            value:'ga'},
            {text:'Iowa',
            value:'ia'},
            {text:'Indiana',
            value:'in'},
            {text:'Kansas',
            value:'ks'},
            {text:'Kentucky',
            value:'ky'},
            {text:'Louisiana',
            value:'la'},
            {text:'Massachusetts',
            value:'ma'},
            {text:'Maryland',
            value:'md'},
            {text:'Michigan',
            value:'mi'},
            {text:'Missouri',
            value:'mo'},
            {text:'Mississippi',
            value:'ms'},
            {text:'North Carolina',
            value:'nc'},
            {text:'New Hampshire',
            value:'nh'},
            {text:'New Jersey',
            value:'nj'},
            {text:'New Mexico',
            value:'nm'},
            {text:'New York',
            value:'ny'},
            {text:'Ohio',
            value:'oh'},
            {text:'Oregon',
            value:'or'},
            {text:'Pennsylvania',
            value:'pa'},
            {text:'South Carolina',
            value:'sc'},
            {text:'Tennessee',
            value:'tn'},
            {text:'Texas',
            value:'tx'},
            {text:'Washington',
            value:'wa'},
            {text:'Wisconsin',
            value:'wi'},
            {text:'West Virginia',
            value:'wv'}       
];
var canada = [
            {text: 'Ontario',
            value: 'on'}
];

function displayAccordingly() {

    //Call mainMenu the main dropdown menu
    var mainMenu = document.getElementById("country-select");

    //Create the new dropdown menu
    var whereToPut = document.getElementById("choices");
    /* var newDropdown = document.createElement("select");
    newDropdown.setAttribute('id',"newDropdownMenu");
    whereToPut.appendChild(newDropdown); */

    if (mainMenu.value == "us") { //The person chose USA

        //Add list of options for US States
        for (var i = 0; i < usa.length; i++) {
        var usState = document.createElement("option");
        usState.text = usa[i]["text"];
        usState.value = usa[i]["value"];
        whereToPut.add(usState,whereToPut.options[null]);
        };
        

    } else if (mainMenu.value == "ca") { //The person chose Canada

        //Add list of options for Canadian States
        for (var i = 0; i < canada.length; i++) {
        var caState = document.createElement("option");
        caState.text = canada[i].text;
        caState.value = canada[i].value;
        whereToPut.add(caState,whereToPut.options[null]);
        };

    };

};

// FILTER TABLE BASED ON SELECTION

// Use d3 to select the button and the form
var button = d3.select("#filter-btn");
var form = d3.select("#form");

// Create event handlers
button.on("click",runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var filterDateTime = d3.select("#datetime");
    var filterCountry = document.getElementById("country-select");
    var filterState = document.getElementById("choices");
    var filterCity = d3.select("#city-select");
    var filterShape = d3.select("#shape-select");

    // Get the value property of the input element
    var dateValue = filterDateTime.property("value");
    var countryValue = filterCountry.value;
    var stateValue = filterState.value;
    var cityValue = filterCity.property("value");
    var shapeValue = filterShape.property("value");

    // Filter through sighting report according to 'datetime' value from input element
    var filteredData = tableData.filter(sighting => (
        (sighting.datetime === dateValue || dateValue === "") &&
        (sighting.country === countryValue || countryValue === "") &&
        (sighting.state === stateValue || stateValue === "") &&
        (sighting.city === cityValue || cityValue === "") &&
        (sighting.shape === shapeValue || shapeValue === "")
        )
    );

    console.log(filteredData);

    // Clear table values
    var tbody = d3.select("tbody");
    tbody.html("");
    
    // Loop through 'filteredData' to insert table rows and populate table values
    filteredData.forEach((sightingReport) => {
        var row = tbody.append("tr");
        Object.entries(sightingReport).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

// UNFILTER TABLE

// Use d3 to select the button and the form
var button = d3.select("#unfilter-btn");

// Create event handlers
button.on("click",unfilterTable);

// Complete the event handler function to clear filter input
function unfilterTable() {

    document.getElementById("form").reset();
    
    populateTable();

}; 
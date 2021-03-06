// from data.js
var tableData = data;

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

// Use d3 to select the button and the form
var button = d3.select("#filter-btn");
var form = d3.select("#form");

// Create event handlers
button.on("click",runEnter);
form.on("submit",runEnter);

// complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    
    // Clear table values
    tbody.html("");

    // Filter through sighting report according to 'datetime' value from input element
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    
    // Loop through 'filteredData' to insert table rows and populate table values
    filteredData.forEach((sightingReport) => {
        var row = tbody.append("tr");
        Object.entries(sightingReport).forEach(([key,value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

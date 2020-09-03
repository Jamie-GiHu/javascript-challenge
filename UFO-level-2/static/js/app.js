// from data.js
var tableData = data;

// POPULATE TABLE WITH SIGHTING DATA FROM DATA.JS

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

// DYNAMIC SELECT MENU

// object literal holding data for option elements
var Select_List_Data = {
    
    'choices': { // name of associated select box
        
        // names match option values in controlling select box
        us: {
            text: ['Alaska','Alabama','Arkansas','Arizona','California','Colorado','Connecticut','Florida','Georgia','Iowa','Indiana','Kansas','Kentucky','Louisiana','Massachusetts','Maryland','Michigan','Missouri','Mississippi','North Carolina','New Hampshire','New Jersey','New Mexico','New York','Ohio','Arkansas','Oregon','Pennsylvania','South Carolina','Tennessee','Texas','Washington','Wisconsin','West Virginia'],
            value: ['ak','al','ar','az','ca','co','ct','fl','ga','ia','in','ks','ky','la','ma','md','mi','mo','ms','nc','nh','nj','nm','ny','oh','on','or','pa','sc','tn','tx','wa','wi','wv']
        },
        ca: {
            text: ['Ontario'],
            value: ['on']
        }
    
    }    
};

// removes all option elements in select box 
// removeGrp (optional) boolean to remove optgroups
function removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild( groups[i-1] );
        }
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
}

function appendDataToSelect(sel, obj) {
    var f = document.createDocumentFragment();
    var labels = [], group, opts;
    
    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;
        
        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode( obj.text[i] ) );
            
            if ( obj.value ) {
                o.value = obj.value[i];
            }
            
            f.appendChild(o);
        }
        return f;
    }
    
    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }
        
        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
};

// anonymous function assigned to onchange event of controlling select box
document.forms['form'].elements['country-select'].onchange = function(e) {
    // name of associated select box
    var relName = 'choices';
    
    // reference to associated select box 
    var relList = this.form.elements[ relName ];
    
    // get data from object literal based on selection in controlling select box (this.value)
    var obj = Select_List_Data[ relName ][ this.value ];
    
    // remove current option elements
    removeAllOptions(relList, true);
    
    // call function to add optgroup/option elements
    // pass reference to associated select box and data for new options
    appendDataToSelect(relList, obj);
};

// populate associated select box as page loads
(function() { // immediate function to avoid globals
    
    var form = document.forms['form'];
    
    // reference to controlling select box
    var sel = form.elements['country-select'];
    sel.selectedIndex = 0;
    
    // name of associated select box
    var relName = 'choices';
    // reference to associated select box
    var rel = form.elements[ relName ];
    
    // get data for associated select box passing its name
    // and value of selected in controlling select box
    var data = Select_List_Data[ relName ][ sel.value ];
    
    // add options to associated select box
    appendDataToSelect(rel, data);
    
}());

// FILTER TABLE BASED ON SELECTION

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
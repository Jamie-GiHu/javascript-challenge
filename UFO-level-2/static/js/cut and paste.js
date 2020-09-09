var filteredData = tableData.filter( sighting => ( sighting.state === document.getElementById("choices").value || document.getElementById("choices").value === "" )
&& ( sighting.country === document.getElementById("country-select").value || document.getElementById("country-select").value === "" )
&& ( sighting.city === d3.select("#city-select").property("value") || d3.select("#city-select").property("value") === "" )
&& ( sighting.datetime === d3.select("#datetime").property("value") || d3.select("#datetime").property("value") === "" )
&& ( sighting.shape === d3.select("#shape-select").property("value") || d3.select("#shape-select").property("value") === "" )
) ;


    //Call mainMenu the main dropdown menu
    var mainMenu = document.getElementById("country-select");

    //Create the new dropdown menu
    var whereToPut = document.getElementById("choices");
    var newDropdown = document.createElement("select");
    newDropdown.setAttribute('id',"newDropdownMenu");
    whereToPut.appendChild(newDropdown);

if (mainMenu.value == "ca") {

Select_List_Data.choices.ca.forEach((state) => { var optionState = document.createElement("option");
        optionState.text=Select_List_Data.choices.ca.text;
        optionState.value=Select_List_Data.choices.ca.value;
        newDropdown.add(optionState,newDropdown.options[null]);
                                               });
};
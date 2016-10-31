/*Assigning variables for each cup (menu has to dynamically check/uncheck checkboxes when
 there are more then 1 selected*/
var cupSmall = document.getElementById("cup-small");
var cupMedium = document.getElementById("cup-medium");
var cupLarge = document.getElementById("cup-large");
var cupXlarge = document.getElementById("cup-xlarge");
var cupArr = new Array(cupSmall, cupMedium, cupLarge, cupXlarge); //Creating an array to loop through the options
var priceArr = new Array(0, 0, 0, 0); // Initializing an array with "0" for each section


/* variables for  pictures swap */
var picWind = document.getElementById("cup-pic"); // section in html where picture is shown
// pictures
var blue = "url('images/cup-blue.jpg')";
var green = "url('images/cup-green.jpg')";
var orange = "url('images/cup-orange.jpg')";
var pink = "url('images/cup-pink.jpg')";
var red = "url('images/cup-red.jpg')";
var colorCounter = 0; //Initial picture array counter (on page load)
var colorCupArr = new Array(blue, green, orange, pink, red); // Array with pictures available
var colorCupArrString = ["blue", "green", "orange", "pink", "red"]; // Array with pictures available (strings)
//picWind.style.backgroundImage = colorCupArr[colorCounter]; //variable with HTML picture section (where it needs to be displayed)


//Event listeners
document.getElementById("myForm").addEventListener("submit", validateForm, false); //for sending and validating the form
document.getElementById("calculate-button").addEventListener("click", setPrice, false); //for calculate button
document.getElementById("previous").addEventListener("click", togglePrevious, false); //picture toggle
document.getElementById("next").addEventListener("click", toggleNext, false); // picture toggle next


/* Initializing "onclick" events. addEventListeners do not trigger checkboxes. I had to use .onclick method in order to
 set up onclick event
 Each method triggers individual checkbox within "cup" secion.
 */
cupSmall.onclick = function() {
	checkCup("cup-small");
};
cupMedium.onclick = function() {
	checkCup("cup-medium");
};
cupLarge.onclick = function() {
	checkCup("cup-large");
};
cupXlarge.onclick = function() {
	checkCup("cup-xlarge");
};

/*
 This method checks if the cup is selected and dynamically adds/deduct the price value in priceArr[0]
 */
function checkCup(id) {
	var id = document.getElementById(id); //id of "cup section" that needs is checked/unchecked
	var test = id.checked; //boolean variable
	var value = id.value; // value of id
	if (test == true) { //if id is checked then loop through cupArr[] to "uncheck" other checkboxes
		for (var i = 0; i < cupArr.length; i++) {
			if (cupArr[i].value != value) { // compare the value of cup id, if it's different then selected then change check to false
				cupArr[i].checked = false;
			}
		}
	}
}
// Checking is cup is selected - returns boolean
// If cup is selected assigned the value to array [0] (cup array)
function setCupPrice() {
	priceArr[0] = 0; //setting up cup price to 0
	for (var i = 0; i < cupArr.length; i++) {
		if (cupArr[i].checked == true) {
			priceArr[0] = parseFloat(cupArr[i].value); // if true add-up the value and return true
			return true;
		}
	}
	return false;
}

/*
 Setting up prices for each sections except for menu (as this needs to be calculated
 dynamically).
 */
function setPricesExceptCups() {
	var upgrade = document.getElementsByClassName("class-upgrade"); //selecting all options from "upgrade" section
	var addOn = document.getElementsByClassName("class-addon"); //selecting all options from "addon" section
	var supplier = document.getElementsByClassName("class-supplier"); //selecting all options from "supplier" section
	/*At first, set up all values within priceArr to 0*/
	for (var x = 1; x < priceArr.length; x++) {
		priceArr[x] = 0;
	}
	/* The below each FOR loop, loops though assigned section to validate how many inputs are true (checked). If checked then accumulate the
	 total value in an priceArr accordingly*/
	for (var i = 0; i < upgrade.length; i++) {
		if (upgrade.item(i).checked == true) {
			priceArr[1] += parseFloat(upgrade.item(i).value);
		}
	}
	for (var b = 0; b < addOn.length; b++) {
		if (addOn.item(b).checked == true) {
			priceArr[2] += parseFloat(addOn.item(b).value);
		}
	}
	for (var c = 0; c < supplier.length; c++) {
		if (supplier.item(c).checked == true) {
			priceArr[3] += parseFloat(supplier.item(c).value);
		}
	}
}

//Calculating price based on priceArr. Print it to html id costID
//If no cup is selected, throw error message
function setPrice() {
	setPricesExceptCups(); // calling function - setting up the total values
	setCupPrice(); // set up prices for cups.
	var priceLabel = document.getElementById("costTot"); // fnding and id
	//var check = setCupPrice(); // boolean value - checks if "CUP" is selected
	var sum = 0; //total sum set to 0

	/* if (check === true){ // We may add "iF cup is selected" to calculate total value only if cup is selected
	 * I removed it for now as I realized that user may wish to calculate the prices of
	 * extra item only*/
	for (var i = 0; i < priceArr.length; i++) {
		sum = sum + priceArr[i];
	}
	priceLabel.innerHTML = "&euro; " + sum.toFixed(2);

	//}
	/*
	 if (check === false){ // otherwise throw an error
	 window.alert("You must select cup size");
	 }
	 */
}

// function for validating and sending or preventing from sending form
function validateForm() {
	var myForm = document.forms["myForm"];

	if (setCupPrice() === true) { //if true then assign the values to "fake" checkboxes and set them on true
		setPricesExceptCups(); // setting up prices
		var hiddenUpgrade = document.getElementById("hidden-upgrade");
		var hiddenAddon = document.getElementById("hidden-addon");
		var hiddenSupplier = document.getElementById("hidden-supplier");
		hiddenUpgrade.checked = true;
		hiddenAddon.checked = true;
		hiddenSupplier.checked = true;
		hiddenUpgrade.value = priceArr[1];
		hiddenAddon.value = priceArr[2];
		hiddenSupplier.value = priceArr[3];
		getColorOfCup(colorCounter);
		myForm.send(); //send form
	}
	//if false, then throw error message
	window.alert("make sure to select cup before submmiting");
	event.preventDefault(); // .... and prevent from sending
}

// swapping picture
function toggleNext() {
	if (colorCounter == 4) { // we have 5 pics in the array,  if last one is reached (4) go to -1
		colorCounter = -1;
	}
	colorCounter++; // add one to color counter
	picWind.style.backgroundImage = colorCupArr[colorCounter]; // change picture
	getColorOfCup(colorCounter); // asign the value to the cup section in html so it can be sent via form
}

// same as the above up but reverse
function togglePrevious() {
	if (colorCounter == 0) { //if we reach number 0 then go to 5
		colorCounter = 5;
	}
	colorCounter--;
	picWind.style.backgroundImage = colorCupArr[colorCounter];
	getColorOfCup(colorCounter);
}

// assign value to the html cup section so it can be passed to the server
function getColorOfCup(colorCounter) {
	var cupColor = document.getElementById("hidden-cup-color");
	cupColor.value = colorCupArrString[colorCounter];

}


//Declaring Variable for dynamic menu buttons
var button1 = document.getElementById("button-label-1"); //Assigning menu button 1
var button2 = document.getElementById("button-label-2"); //Assigning menu button 2
var button3 = document.getElementById("button-label-3"); //Assigning menu button 3
var button4 = document.getElementById("button-label-4"); //Assigning menu button 4

// Adding event listeners to each menu button
button1.addEventListener("click", function() {
	toggleElement("section-selection-1");
}, false);

button2.addEventListener("click", function() {
	toggleElement("section-selection-2");
}, false);

button3.addEventListener("click", function() {
	toggleElement("section-selection-3");
}, false);

button4.addEventListener("click", function() {
	toggleElement("section-selection-4");
}, false);


// Function to toggle hide/show elements, passing a selection assigned to each button individually
function toggleElement(id) { //id  = id of section that the button should trigger
	var idIn = document.getElementById(id);
	idIn.style.visibility = idIn.style.visibility == "visible" ? "hidden" : "visible"; // logic statement

	if (idIn.style.visibility == "visible") { // changing margin of section that suppose to be shown
		idIn.style.marginTop = "30px";
	}
	if (idIn.style.visibility == "hidden") { // changing maring of sections that suppose to be hiddent.
		// Not all sections are equal therefore there is a difference in maring size
		switch (id) { // Switch to find correct length of margin
			case id = "section-selection-1":
				idIn.style.marginTop = "-65px";
				break;
			case id = "section-selection-2":
				idIn.style.marginTop = "-65px";
				break;
			case id = "section-selection-3":
				idIn.style.marginTop = "-40px";
				break;
			case id = "section-selection-4":
				idIn.style.marginTop = "-40px";
				break;
			default:
				break;
		}
	}

}

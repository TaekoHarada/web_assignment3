/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified.
// Do any of these variables need to be initialized when the page is loaded?
// >>> I think it is better to be initialized when the page is loaded
// When do they need to be reset or updated?
// >>> When the elements are clicked.

// Set day names for the use of days_element and the other part
var days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

// Initialize days elements
var days_elements = []; //array for dats elements

for (let i = 0; i < days.length; i++) {
  days_elements.push(document.getElementById(`${days[i]}`));
}

var full = document.getElementById("full");
var half = document.getElementById("half");

var calculated_cost = document.getElementById("calculated-cost");

var clear_button = document.getElementById("clear-button");

// number of clicked days of week
var dayCounter = 0;

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
function colour_change_for_days() {
  if (this.classList.contains("clicked")) {
    //remove the "clicked" class
    this.classList.remove("clicked");
    dayCounter -= 1;
  } else {
    //apply the "clicked" class
    this.classList.add("clicked");
    dayCounter += 1;
  }
  // calculate total cost
  calculate();
}

// Add EventListener to days elements
for (let i = 0; i < days_elements.length; i++) {
  days_elements[i].addEventListener("click", colour_change_for_days);
}

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
function clear() {
  for (let i = 0; i < days_elements.length; i++) {
    days_elements[i].classList.remove("clicked");
  }

  full.classList.add("clicked");
  half.classList.remove("clicked");

  dayCounter = 0;
  calculate();
}

clear_button.addEventListener("click", clear);

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
function change_rate(clicked_element, other_element) {
  if (clicked_element.classList.contains("clicked")) {
    clicked_element.classList.remove("clicked");
    other_element.classList.add("clicked");
  } else {
    clicked_element.classList.add("clicked");
    other_element.classList.remove("clicked");
  }
  calculate();
}

full.addEventListener("click", function () {
  change_rate(full, half);
});
half.addEventListener("click", function () {
  change_rate(half, full);
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function calculate() {
  if (full.classList.contains("clicked")) {
    calculated_cost.innerHTML = dayCounter * 35;
  } else if (half.classList.contains("clicked")) {
    calculated_cost.innerHTML = dayCounter * 20;
  }
}

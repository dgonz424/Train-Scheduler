//Testing old code to figure out I need to change Start Date to Frequency (mins), Months Worked to Next Arrival, and Monthly Rate to Minutes Away on corresponding chart (comparing Employee Tracker to Cruise Scheduler. 
firebase.child(-KeaL-two6tBn1D-zGy0).removevalue();

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new cruises - then update the html + update the database
// 3. Create a way to retrieve cruises from the cruise database.
// 4. Create a way to calculate the next arrival. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate minutes away

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAwSr3477DtqhqGJ-fKl_FIWHI0tUYV0bc",
    authDomain: "week7homework-8c50f.firebaseapp.com",
    databaseURL: "https://week7homework-8c50f.firebaseio.com",
    storageBucket: "staging.week7homework-8c50f.appspot.com",
    messagingSenderId: "1023746180545"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Cruises
$("#add-cruise-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var cruName = $("#cruise-name-input").val().trim();
  var cruDest = $("#destination-input").val().trim();
  var cruStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var cruRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding cruise data
  var newCru = {
    name: cruName,
    destination: cruDest,
    start: cruStart,
    rate: cruRate
  };

  // Uploads cruise data to the database
  database.ref().push(newCru);

  // Logs everything to console
  console.log(newCru.name);
  console.log(newCru.destination);
  console.log(newCru.start);
  console.log(newCru.rate);

  // Alert
  alert("Cruise successfully added");

  // Clears all of the text-boxes
  $("#cruise-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding cruise to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var cruName = childSnapshot.val().name;
  var cruDest = childSnapshot.val().destination;
  var cruStart = childSnapshot.val().start;
  var cruRate = childSnapshot.val().rate;

  // Employee Info
  console.log(cruName);
  console.log(cruDest);
  console.log(cruStart);
  console.log(cruRate);

  // Prettify the cruise start
  var cruStartPretty = moment.unix(cruStart).format("MM/DD/YY");

  // Calculate the next arrival using hardcore math
  // To calculate the next arrival
  var cruArrival = moment().diff(moment.unix(cruStart, "X"), "months");
  console.log(cruArrival);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#cruise-table > tbody").append("<tr><td>" + cruName + "</td><td>" + cruDest + "</td><td>" +
  cruStartPretty + "</td><td>" + cruArrival + "</td><td>" + cruRate + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

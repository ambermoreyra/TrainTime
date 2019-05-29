var firebaseConfig = {
    apiKey: "AIzaSyCQpWNwW24JEfD8fQd6M-9lCbm_YL9b16k",
    authDomain: "test-project-1b92e.firebaseapp.com",
    databaseURL: "https://test-project-1b92e.firebaseio.com",
    projectId: "test-project-1b92e",
    storageBucket: "test-project-1b92e.appspot.com",
    messagingSenderId: "132636513668",
    appId: "1:132636513668:web:4759b5aa1072e043"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    


    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: firstTrain,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
    
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var firstTrain = snapshot.val().first;
    var trainFrequency = snapshot.val().frequency;

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    
    console.log("difference in time: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    var tMinutesAway = trainFrequency - tRemainder;
    console.log("minutes til train: " + tMinutesAway);

    var nextTrain = moment().add(tMinutesAway, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);


    var newRow = $("<tr>").append(
      $("<td>").text(snapshot.val().name),
      $("<td>").text(snapshot.val().destination),
      $("<td>").text(snapshot.val().frequency),
      $("<td>").text(nextTrain.format("HH:mm")),
      $("<td>").text(tMinutesAway),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
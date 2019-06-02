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

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (snapshot) {

    var firstTrain = snapshot.val().first;
    var trainFrequency = snapshot.val().frequency;

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

    var tRemainder = diffTime % trainFrequency;

    var tMinutesAway = trainFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesAway, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(snapshot.val().name),
        $("<td>").text(snapshot.val().destination),
        $("<td>").text(snapshot.val().frequency),
        $("<td>").text(nextTrain.format("HH:mm")),
        $("<td>").text(tMinutesAway),
    );

    $("#train-table > tbody").append(newRow);
});
$(document).ready( function (){
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyAyEV9G5vQc1ZNjCsXmOsbfepQ0WRf84o4",
    authDomain: "trainschedule-b891f.firebaseapp.com",
    databaseURL: "https://trainschedule-b891f.firebaseio.com",
    projectId: "trainschedule-b891f",
    storageBucket: "trainschedule-b891f.appspot.com",
    messagingSenderId: "1080726934134"
  };
  firebase.initializeApp(config);


  const database = firebase.database();

  $("#add-train").on("click", add => {

    console.log("Hello");

   const trainName = $("#train-name").val().trim();
   const trainDest = $("#train-destination").val().trim();
   const trainTime = moment($("#train-time").val().trim(), "HH:mm").format("X");
   const trainFreq = $("#train-frequency").val().trim();

   const newTrain = {
       name: trainName,
       destination: trainDest,
       firstTime: trainTime,
       frequency: trainFreq,
   };

//    push information into the databse
   database.ref().push(newTrain);


// clear values
   $("#train-name").val("");
   $("#train-destination").val("");
   $("#train-time").val("");
   $("#train-frequency").val("");
  });

  database.ref().on("child_added", snap => {

    const trainName = snap.val().name;
    const trainDest = snap.val().destination;
    const trainTime = snap.val().firstTime;
    const trainFreq = snap.val().frequency;

    // better trainTime look
    // const trainTime1 = moment.unix(trainTime).format("HH:mm");
    // console.log(trainTime1);

    const differenceTime = moment().diff(moment.unix(trainTime), "minutes");
    const timeRemaining = differenceTime % trainFreq ;

    // time to arrival 
    const minToArr = trainFreq - timeRemaining;
    
    // next train
    const nextTrain = moment().add(minToArr, "m").format("hh:mm A"); 

    // add information to the table
    $("#train-table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain +"</td><td>" + minToArr + "</td>");
  });



});
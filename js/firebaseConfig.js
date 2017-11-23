var config = {
    apiKey: "AIzaSyBoJ2xUGe_oX9llU1BG8muaGzm5hI9JruQ",
    authDomain: "cs4830hackweek.firebaseapp.com",
    databaseURL: "https://cs4830hackweek.firebaseio.com",
    projectId: "cs4830hackweek",
    storageBucket: "cs4830hackweek.appspot.com",
    messagingSenderId: "430410065620"
  };

firebase.initializeApp(config);
var dbRef = firebase.database().ref();  

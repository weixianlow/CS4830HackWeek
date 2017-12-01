var userInfo = undefined;
var dbRef = firebase.database().ref();
//thinking of adding dbRefUsers and dbRefGroups so i can call them easily instead of calling .child() all the time.

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		userInfo = user;

		//here onwards, do whatever you want to populate data. lol. but the structure is basically like so, you want to do all of your logic and processes in this scope. and call the functions you need.
		//we can probably remove the group.js, unless you want to write specific .js file for each of the page. I'm good with that too, we can then seperate the functions to their own .js accordingly.
	} else {
		//redirect to login page if user hasn't logon
		window.location.replace("index.html"); //probably should change this back to the original login page <----------
	}
});

function promiseUpdate(value, $scope, updateFn){
	
}

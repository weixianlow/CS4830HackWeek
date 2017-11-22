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
		window.location.replace("http://cs4085.weixianlow.me/login.html"); //probably should change this back to the original login page <----------
	}
});


//to create user account into database if it's their initial login.
function createUser(user){
	dbRef.child("users/" + user.uid + "/").set({
		username: user.displayName,
		email: user.email,
		uid: user.uid
	});
}

//to create a new group and associate the user as the owner of the group
function createGroup(user, groupName){
	dbRef.child("groups/"+ groupName + "/").set({
		name: groupName,
		owner: user.uid
	});
	dbRef.child("users/" + user.uid + "/groups/" + groupName + "/").set({
		role: "owner"
	});
}

//to get a list of group that the user has joined/
function getGroupListJoined(user){
	var response;
	dbRef.child("users/" + user.uid + "/groups/").once(function (snapshot){
		this.response = snapshot;
	});

	return (response.val());
}

//to get a list of groups to join, treat it as a public view
function getGroupList(){
	var response;
	dbRef.child("groups/").once(function (snapshot){
		this.response = snapshot;
	});
	return(response.val());
}

//to add a user to an existing group
function joinGroup(user, groupName){
	dbRef.child("users/" + user.uid + "/groups/" + groupName + "/").set({
		role: "participant"
	});
}

function sendMessage(user, groupName){
	//to be continued
	//need to add Date to here to monitor which message comes first, so you can sort on client side.
	//firebase also have a sort feature if you use .once(). check documentation
}

function retrieveMessage(user, groupName){
	//to be continued
	//also, after calling this function, .on() needs to be called and set to monitor "value" changes for new messages.
	//.on() will call a function with a snapshot of the new message, we can then use the snapshot.val() to append a message to the message view.
}

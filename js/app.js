var userInfo = undefined;
var chatRef = firebase.database().ref("chat");
var chat = new Firechat(chatRef);

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		userInfo = user;

		initChat(user);
	} else {
		//redirect to login page if user hasn't logon
		window.location.replace("http://cs4085.weixianlow.me/login.html");
	}
});

function initChat(user){

	chat.setUser(user.uid, user.displayName, function(user){

	})
}

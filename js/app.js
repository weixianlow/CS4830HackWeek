var userInfo = undefined;

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
	var chatRef = firebase.database().ref("chat");

	var chat = new Firechat(chatRef);
	chat.setUser(user.uid, user.displayName, function(user){

	})
}

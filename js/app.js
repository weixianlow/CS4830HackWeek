var userInfo = undefined;
var chat = new Firechat(firebase.database().ref("chat"));

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

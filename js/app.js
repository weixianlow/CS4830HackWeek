var userInfo = undefined;

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		userInfo = user;
	} else {
		//redirect to login page if user hasn't logon
		window.location.replace("http://cs4085.weixianlow.me/login.html");
	}
});

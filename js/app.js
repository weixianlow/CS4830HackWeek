var userInfo = undefined;

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		userInfo = user.providerData[0];
		user.providerData.forEach(function (profile) {
			console.log("Sign-in provider: " + profile.providerId);
			console.log("  Provider-specific UID: " + profile.uid);
			console.log("  Name: " + profile.displayName);
			console.log("  Email: " + profile.email);
			console.log("  Photo URL: " + profile.photoURL);
		}); 
	} else {
		//redirect to login page if user hasn't logon
		window.location.replace("http://cs4085.weixianlow.me/login.html");
	}
});

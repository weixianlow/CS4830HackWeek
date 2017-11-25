firebase.auth().onAuthStateChanged(function(user){
	if(user){
		window.location.replace("user.html");
	}
 });
 
 // FirebaseUI config.
 var uiConfig = {
	callbacks: {
		signInSuccess: function(currentUser, credential, redirectUrl) {
			if(!currentUser){
				$("#errorLogin").show();
					return;
			}
 
			dbRef.child("users/" + currentUser.uid).once("value").then(function(snapshot){
				if(!(snapshot.val() && snapshot.val().username)){
					dbRef.child("users/" + currentUser.uid).set({
						username: currentUser.displayName,
						email: currentUser.email,
						uid : currentUser.uid
					});
				}
 
				window.location.replace("user.html");
			});
 
			return false;
		}
	},
	signInOptions: [
		// Leave the lines as is for the providers you want to offer your users.
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


var groupName = window.localStorage.getItem("groupName");

/*dbRef.child("users/" + user.uid + "/groups/" + this.groupName + "/").once("value").then(function(snapshot){
	if (snapshot == null){
		window.location.replace("user.html");
	}
});*/

angular.module('Chat', []).controller('ChatController', function($scope, $window){

	var outer = this;
	var delayedRefresh;

	this.groupName = groupName;

	/*users*/
	this.moderators = {
		isShown: false
	};
	this.members = {
		isShown: false
	}

	this.toggleShown = function(userType){
		userType.isShown = !userType.isShown;
	}

	/*messages*/
	this.messages = [];

	this.sendMessage = function(){
		if(outer.input){
			var date = Date.now();
		    var newDbRef = dbRef.child("groups/" + outer.groupName + "/messages/").push();

		    newDbRef.set({
				owner: userInfo.displayName,
				data: outer.input
			});

			outer.input = "";
		}
	}

	dbRef.child("groups/" + outer.groupName + "/messages/").on("child_added", function(snapshot){
		var newMessage = snapshot.val();

		outer.messages.push({
			name: newMessage.owner,
			data: newMessage.data
		});

		var phase = $scope.$$phase;

		if(phase === "$digest" || phase === "$apply" ){
			if(!delayedRefresh){
				delayedRefresh = setTimeout(function(){
					$scope.$apply();
					document.getElementById("messages").scrollTo(0, 10000);
					delayedRefresh = undefined;
				}, 512);
			}
		} else {
			$scope.$apply();
			document.getElementById("messages").scrollTo(0, 10000);
		}
	});
});

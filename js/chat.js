var groupName = window.localStorage.getItem("groupName");

/*dbRef.child("users/" + user.uid + "/groups/" + this.groupName + "/").once("value").then(function(snapshot){
	if (snapshot == null){
		window.location.replace("user.html");
	}
});*/

angular.module('Chat', []).controller('ChatController', function($scope){

	var outer = this;
	var delayedRefresh;

	this.groupName = groupName;

	/*users*/

	this.moderators = {
		isShown: false,
		id: "#mods",
		users: []
	};
	this.members = {
		isShown: false,
		id: "#members",
		users: []
	}

	dbRef.child("usersInGroups/" + outer.groupName).once("value").then(function(snapshot){
		snapshot.forEach(function(child){
			var user = child.val();

			if(userInfo.uid === child.key){
				outer.role = user.role;
			}

			switch(user.role){
				case "member":
					outer.members.users.push({
						name: user.name,
						id: child.key
					});
					break;

				case "moderator":
					outer.moderators.users.push({
						name: user.name,
						id: child.key
					});
					break;
				case "owner":
					outer.owner = user.name;
					break;
			}
		});

		var phase = $scope.$$phase;

		if(phase === "$digest" || phase === "$apply" ){
			if(!delayedRefresh){
				delayedRefresh = setTimeout(function(){
					$scope.$apply();
					$('[data-toggle="tooltip"]').tooltip(); 
					delayedRefresh = undefined;
				}, 512);
			}
		}else{	
			$scope.$apply();
			$('[data-toggle="tooltip"]').tooltip(); 	
		}
	});

	this.isModerator = function(){
		return this.role.match(/^moderator$|^owner$/g) ? true : false;
	}

	this.toggleShown = function(userType){
		userType.isShown = !userType.isShown;
		if(userType.users && userType.users.length){
			$(userType.id).animate({
			    height: 'toggle'
			});
		}
	}

	this.setRole = function(uid, role){
		console.log(uid);

		dbRef.child("usersInGroups/" + outer.groupName + "/" + uid).update({
			role: role
		});

		if(role === "moderator"){
			var index = outer.members.users.findIndex(function(elem){
				return elem.id === uid;
			});

			outer.moderators.users.push(outer.members.users[index]);
			outer.members.users.splice(index, 1);
		} else if(role === "member"){
			var index = outer.moderators.users.findIndex(function(elem){
				return elem.id === uid;
			});

			outer.members.users.push(outer.moderators.users[index]);
			outer.moderators.users.splice(index, 1);
		}
	}

	/*messages*/
	this.messages = [];

	//load messages
	dbRef.child("groups/" + outer.groupName + "/messages/").on("child_added", function(snapshot){
		var newMessage = snapshot.val();
		outer.messages.push({
			id: snapshot.key,
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

	this.deleteMessage = function(message){
		var index = outer.messages.findIndex(function(elem){
			return elem.id === message;
		});

		dbRef.child("groups/" + this.groupName + "/messages/" + message).remove();

		outer.messages.splice(index, 1);
	}
});

dbRef.child("users/" + userInfo.uid).once("value").then(function(snapshot){
	if(!(snapshot.val() && snapshot.val().username)){
		dbRef.child("users/" + userInfo.uid).set({
			username: userInfo.displayName,
			email: userInfo.email,
			uid : userInfo.uid
		});
	}
});

angular.module('ChatGroupList', []).controller('GroupListController', function($scope){

	this.loadGroups = function(){

		var outer = this;

		/*chat.getRoomList(function(groupObj){
			outer.groupList = Object.entries(groupObj).map(function(elem){
				return elem[1];
			});

			$scope.$apply();
		});*/
	}

	this.create = function(){
		if(this.newGroupName){
			console.log(this.newGroupName);
			chat.createRoom(this.newGroupName, "public", function(roomId){
				console.log(roomId);
			});
		}
	}
});

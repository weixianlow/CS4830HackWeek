angular.module('ChatGroupList', []).controller('GroupListController', function($scope, $timeout){
	var outer = this;

	this.userGroups = [];

	this.loadGroups = function(){

		$timeout(function(){
			dbRef.child("users/" + userInfo.uid + "/groups/").once("value").then(function(snapshot){
				outer.userGroups = Object.entries(snapshot.val()).map(function(elem){
					return {
						name:elem[0],
						role:elem[1].role
					};
				});

				$scope.$apply();
			});
		}, 256);
	}

	this.join = function(){		
		outer.joinGroupName = "";
	}

	this.create = function(){
		dbRef.child("groups/" + outer.newGroupName).once("value").then(function(snapshot){
			if(snapshot.val()){
				$("#newGroupModal").modal("hide");
				$("#errorDuplicateGroup").show();
			} else {
				dbRef.child("groups/" + outer.newGroupName + "/").set({
					name: outer.newGroupName,
				});

				dbRef.child("users/" + userInfo.uid + "/groups/" + outer.newGroupName + "/").set({
					role: "owner"
				});

				outer.newGroupName = "";
			}
		});
	}
});

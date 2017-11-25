angular.module('ChatGroupList', []).controller('GroupListController', function($scope, $timeout, $window){
	var outer = this;

	this.userGroups = [];

	this.loadGroups = function(){

		$timeout(function(){
			dbRef.child("users/" + userInfo.uid + "/groups/").once("value").then(function(snapshot){
				outer.userGroups = Object.entries(snapshot.val()).map(function(elem){
					return {
						name:elem[0],
					};
				});

				$scope.$apply();
			});
		}, 512);
	}

	this.joinChat = function(group){
		console.log(group);
		$window.localStorage.setItem("groupName", group);
		//$window.localStorage.getItem("groupName");
		//$window.localStorage.removeItem("groupName")
	}

	this.join = function(){
		if(this.joinGroupName){
			dbRef.child("groups/" + outer.joinGroupName + "/").once("value").then(function(snapshot){
				if(snapshot.val()){
					dbRef.child("users/"+ userInfo.uid + "/groups/" + outer.joinGroupName + "/").once("value").then(function(snapshot){
						if(snapshot.val()){
							$("#joinGroupModal").modal("hide");
							$("#warningAlreadyJoined").show();
						}else{
							dbRef.child("users/"+userInfo.uid + "/groups/" + outer.joinGroupName + "/").set({

								role: "participant"
							});
							outer.userGroups.push({name: outer.joinGroupName});
							outer.joinGroupName = "";
							$scope.$apply();

							$("#joinGroupModal").modal("hide");
							$("#successGroupJoined").show();
						}
					});
				}else{
					$("#joinGroupModal").modal("hide");
					$("#errorNoSuchGroup").show();
				}
			});
		}
	}

	this.create = function(){
		if(this.newGroupName){
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

					outer.userGroups.push({name: outer.newGroupName});
					outer.newGroupName = "";
					$scope.$apply();

					$("#newGroupModal").modal("hide");
					$("#successGroupCreated").show();
				}
			});
		}
	}
});

angular.module('ChatGroupList', []).controller('GroupListController', function($scope, $interval, $window){
	history.pushState(null, "CS4830-HackWeek: Login", "http://ec2-52-15-213-101.us-east-2.compute.amazonaws.com/CS4830HackWeek/index.html");

	var outer = this;

	this.userGroups = [];



	this.loadGroups = function(){

		var userCheck = $interval(function(){
			if(userInfo){
				dbRef.child("users/" + userInfo.uid + "/groups/").once("value").then(function(snapshot){
					outer.userGroups = Object.entries(snapshot.val()).map(function(elem){
						return {
							name:elem[0],
						};
					});

					$scope.$apply();

					if(angular.isDefined(userCheck)){
						$interval.cancel(userCheck);
					}
				});
			}
		}, 10, 64);
	}

	this.joinChat = function(group){
		$window.localStorage.setItem("groupName", group);
		window.location.replace("chat.html");
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
							dbRef.child("groups/"+ outer.joinGroupName + "/users/participant/" + userInfo.displayName + "/").set({

								userUID: userinfo.uid
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
					dbRef.child("groups/"+ outer.joinGroupName + "/users/owner/" + userInfo.displayName + "/").set({

						userUID: userinfo.uid
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

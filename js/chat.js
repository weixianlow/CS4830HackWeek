angular.module('Chat', []).controller('ChatController', function($scope, $window){

	var outer = this;
	var groupName = $window.localStorage.getItem("groupName");
	var delayedRefresh;

	this.messages = [];	

	this.sendMessage = function(){
		if(outer.input){
			var date = Date.now();
		    var newDbRef = dbRef.child("groups/" + groupName + "/messages/").push();

		    newDbRef.set({
				owner: userInfo.displayName,
				data: outer.input
			});

			outer.input = "";
		}
	}

	dbRef.child("groups/" + groupName + "/messages/").on("child_added", function(snapshot){
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
					delayedRefresh = undefined;
				}, 512);
			}	
		} else {
			$scope.$apply();
		}
	});
});

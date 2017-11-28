angular.module('Chat', []).controller('ChatController', function($scope, $window){

	var outer = this;
	var groupName = $window.localStorage.getItem("groupName");

	this.messages = [];	

	/*this.loadMessages = function(){
		 dbRef.child("groups/" + groupName + "/messages/").limitToLast(50).once('value').then(function(snapshot){
			outer.messages = Object.entries(snapshot.val()).map(function(elem){
				return {
					name: elem[1].owner,
					data: elem[1].data
				};
			});
			$scope.$apply();
		});
	}*/

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

		//$scope.$apply();
	});
});

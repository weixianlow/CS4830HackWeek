angular.module('Chat', []).controller('ChatController', function($scope, $window){

	var outer = this;
	var groupName = $window.localStorage.getItem("groupName");

	this.messages = [];	

	this.loadMessages = function(){
		 dbRef.child("groups/" + groupName + "/messages/").once('value').limitToLast(50).orderByValue().then();
	}

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
});

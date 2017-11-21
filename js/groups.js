angular.module('ChatGroupList', []).controller('GroupListController', function(){
	this.create = function(){
		if(this.newGroupName){
			console.log(this.newGroupName);
			chat.createRoom(this.newGroupName, "public", function(roomId){
				console.log(roomId);
			});
		}
	}
});

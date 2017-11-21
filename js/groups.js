angular.module('ChatGroupList', []).controller('GroupListController', function(){
	this.create = function(){
		if(this.newGroupName){
			console.log(this.newGroupName);
			chat.createRoom(this.newGroupName, "public", roomCreated(roomId));
		}
	}
});

this.roomCreated = function(roomId){
	console.log(roomId);
}

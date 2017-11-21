angular.module('ChatGroupList', []).controller('GroupListController', function(){
	this.create = function(){
		if(this.newGroupName){
			console.log(this.newGroupName);
			this.newGroupName = "";
		}
	}
});

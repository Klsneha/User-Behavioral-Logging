console.log('Events controller');
angular.module('userEvents',[])

.controller('userEventsCtrl', function($scope,$rootScope){
	console.log('testing user events controller');

	$rootScope.clickevents={mouseup:$scope.countMouseMove};
	$scope.countMouseMove = 0;
	$scope.countUpVote=0;
	$scope.countDownVote = 0;
	$scope.countAddComment=0;
	$scope.countAddAndPost=0;
	var app =this;
	this.MouseMove=function(){
		console.log('Move move event test');
    	
    	$scope.countMouseMove++;
    	localStorage.setItem('countMouseMove',$scope.countMouseMove);
 
	};

	this.UpVoteClick=function(){
		$scope.countUpVote++;
		localStorage.setItem('countUpVote',$scope.countUpVote);
	};

	this.downVoteClick=function(){
		$scope.countDownVote++;
		localStorage.setItem('countDownVote',$scope.countDownVote);
	};

	this.addCommentClick=function(){
		$scope.countAddComment++;
		localStorage.setItem('countAddComment',$scope.countAddComment);
	};

	this.addAndPost=function(){
		$scope.countAddAndPost++;
		localStorage.setItem('countAddAndPost',$scope.countAddAndPost);
	};
});
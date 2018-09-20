angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){

    var app=this;
	this.regUser=function(regData){
		app.loading=true;
		app.errorMsg=false;
		console.log('form submitted');
		console.log(this.regData);

		User.create(app.regData).then(function(data){
            
			console.log(data.data.success);
			console.log(data.data.message);

			if(data.data.success){
				app.loading=false;
				//create Success Message
				app.successMsg=data.data.message+'... Redirecting';
				// Redirect to Home Page
				$timeout(function(){
					$location.path('/login');
				},2000);
				
			} else{
				app.loading=false;
				//create an error message
				app.errorMsg=data.data.message;
			}

		});
	};

});






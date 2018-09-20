console.log('testing new file');
angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth, $timeout, $location, $rootScope){
	console.log('testing main ctrl');
	var app=this;

	$rootScope.$on('$routeChangeStart', function(){

			if(Auth.isLoggedIn()){
		console.log('Success: User is logged in.');

		app.isLoggedIn=true;
		Auth.getUser().then(function(data){
			//console.log(data);
			console.log(data.data.username);
			app.username=data.data.username;
			app.useremail=data.data.email;
			app.loginHistory=data.data.loginHistory;
			console.log(data);
			});
		} else{
		console.log('Failure: USer is not logged in.');
		app.isLoggedIn=false;
		app.username='';
		}
	});

	

	this.doLogin=function(loginData){
		app.loading=true;
		app.errorMsg=false;
		console.log('form submitted');
		console.log(this.loginData);

		Auth.login(app.loginData).then(function(data){

			console.log(data.data.success);
			console.log(data.data.message);

			if(data.data.success){
				app.loading=false;
				//create Success Message
				app.successMsg=data.data.message+'... Redirecting';
				// Redirect to Home Page
				$timeout(function(){
					$location.path('/home');
					app.loginData='';
					app.successMsg=false;
				},2000);
				
			} else{
				app.loading=false;
				//create an error message
				app.errorMsg=data.data.message;
			}

		});
	};

	this.logout=function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/');
		},2000);
	};

});







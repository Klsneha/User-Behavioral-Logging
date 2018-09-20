/*console.log('Testing routes file');

angular.module('appRoute',['ngRoute'])



.config(function($routeProvider){

	$routeProvider
	.when('/',{
		templateURL: 'app/views/pages/home.html'
	})
	.when('/about',{

		templateURL: 'app/views/pages/about.html'
	});

});
*/

angular.module('appRoute', ['ngRoute'] )

.config(function($routeProvider){
   $routeProvider
   .when('/',{
   	templateUrl: 'app/views/pages/home.html'
   })

   .when('/register',{
   	templateUrl: 'app/views/pages/users/register.html',
   	controller: 'regCtrl',
   	controllerAs: 'register'
   })

   .when('/about', {
   	templateUrl: 'app/views/pages/about.html'
   })

   .when('/login', {
   	templateUrl: 'app/views/pages/users/login.html'
   })

   .when('/logout',{
   	templateUrl: 'app/views/pages/users/logout.html'
   })

   .when('/profile', {
   	templateUrl: 'app/views/pages/users/profile.html'
   })

   .when('/StackOverFlow',{
   	templateUrl: 'app/views/pages/StackOverFlow.html',
   	controller: 'userEventsCtrl',
   	controllerAs: 'userEvents'
   })

   .otherwise({ redirectTo: '/'});

  	
});

console.log('Testing main app configuration');

angular.module('userApp',['appRoute', 'userControllers', 'userServices','ngAnimate', 'mainController','authServices','userEvents'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors'); 
}); 
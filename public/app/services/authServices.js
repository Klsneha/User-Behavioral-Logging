console.log("testing auth services");
angular.module('authServices',[])


  
.factory('Auth',function($http, AuthToken){
	var authFactory={};

    //User.create(regData);
    authFactory.login=function(loginData){
    	return $http.post('/api/authenticate', loginData).then(function(data){
    		//console.log(data.data.token);
    		AuthToken.setToken(data.data.token);
    		return data;
    	});
    };

    authFactory.isLoggedIn = function(){
    	if(AuthToken.getToken()){
    		return true;
    	}
    	else{
    		return false;
    	}
    };

    authFactory.getUser=function(){
    	if(AuthToken.getToken()){
    		return $http.post('/api/me');
    	} else{
    		$q.reject({ message: 'User has no token'});
    	}
    };

    authFactory.logout=function(){
    	AuthToken.setToken();
    };
	return authFactory;
})
//storing the token on client side
.factory('AuthToken', function($window){
	var authTokenFactory={};
	//custom function to setting up of token
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token', token);
		} else{
			$window.localStorage.removeItem('token');
		}
	};

	authTokenFactory.getToken= function(){
		return $window.localStorage.getItem('token');
	};
	return authTokenFactory;
})


.factory('AuthInterceptors', function(AuthToken){

	var authInterceptorsFactory={};

	authInterceptorsFactory.request=function(config){
		var token=AuthToken.getToken();
		if(token) config.headers['x-access-token']=token; 
		return config; 
	};

	return authInterceptorsFactory; 
});
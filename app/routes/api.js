var User=require('../models/user');
var jwt =require('jsonwebtoken');
var secret='harrypotter';

module.exports=function(router){
	//USER Registration Route
	router.post('/users', function(req,res){
	//res.send('testing users route');
	var user=new User();
	user.username=req.body.username;
	user.password=req.body.password
	user.email=req.body.email;
	user.loginHistory=[];
	if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email=='')
	{
		//res.send('Ensure username, email and Password are provided');
		res.json({ success: false, message: 'Ensure username, email and Password are provided'});
	}else{

			user.save(function(err){
			if(err){
				//res.send('Username or Email already exists!');
				res.json({ success: false, message: 'Username or Email already exists!'});
			} else{
				//res.send('user created');
				res.json({ success: true, message: 'User Created'});
			}
	});
	}
	
	
});

//User Login Route 
//http://localhost:8080/api/authenticate
router.post('/authenticate', function(req,res){
	
	User.findOne({ username: req.body.username }).select('email username password loginHistory').exec(function(err,user){
		if(err){ throw err;}

		if(!user) {
			res.json({ success: false, message: 'Could not Authenticate the User'});
		} else if(user){
			//Password Validation
			if(!req.body.password){
				
				res.json({ success: false, message: 'No Password Provided'});
			}else{
				//res.json({ success: false, message: 'No Password Provided'});
				if(!(user.password===req.body.password)){
					res.json({ success: false,message: 'Could not authenticate password'});
				}
			    else{

				var dt=new Date();
				user.loginHistory.push(dt);
				user.save(); 
				var token=jwt.sign({ username: user.username, email: user.email, loginHistory: user.loginHistory}, secret,{ expiresIn: '24h' } );
				res.json({ success: true, message:'User authenticated!', token: token });
			 }
			}
		
		}
	});
});



router.use(function(req,res,next){
	var token=req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){
		//verify token
		jwt.verify(token,secret, function(err, decoded){
			if(err) {
				res.json({sucess: false, message: 'Token Invalid'});
			} else{
				req.decoded = decoded;
				next();
			}
		});
	} else{
		res.json({sucess: false, message: 'No token provided'});
	}
});


router.post('/me', function(req,res){
	res.send(req.decoded);
});



	return router;
}



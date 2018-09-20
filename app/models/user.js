//Defining the database/user schema done using mongoose
var mongoose = require('mongoose');//invokes mongoose module
var Schema = mongoose.Schema;// uses schema of mongoose to create a user schema    
var bcrypt=require('bcrypt-nodejs');

//we provide the columns of the database
var UserSchema=new Schema({
  username: {type: String, lowercase: true, required: true, unique :true},
  password: {type: String, required: true},
  email:{ type:String, required: true, lowercase: true, unique: true}, 
  loginHistory:[{type:String}]
});

//mongoosh middleware presave: before saving in the schema do the below functionality of encrypting the password 


UserSchema.methods.comparePassword=function(password){
  return bcrypt.compareSync(password, this.password);
}


//export the Schema to the server file i.e. server.js
module.exports=mongoose.model('User', UserSchema);
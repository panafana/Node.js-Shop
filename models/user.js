var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var userschema = new Schema({
    email: {type:String, required: true},
    password: {type:String, required: true},
}); 

userschema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);  
};

userschema.methods.valPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User',userschema);
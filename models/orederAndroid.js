var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    user: {type:String, required: true},
    cart: {type:Object, required: true},
    address: {type:String, required: true},
    name: {type:String, required: true},
    totalQty:{ type:Number, required:true},
    totalPrice:{type:Number,required:true}
}); 

module.exports = mongoose.model('OrderAndroid',schema);

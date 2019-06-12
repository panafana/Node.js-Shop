var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');
var Cart = require('../models/cart');
var OrderAndroid = require('../models/orederAndroid');
var User = require('../models/user');

router.post('/signin', function(req,res){
    var email =req.body.email;
    var password = req.body.password;
    console.log("email" ,email);
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        
    }

    User.findOne({'email':email},function(err,user){
    if(err){
        res.send(err);       
    }
    if(!user){
        res.send('No user found');
    }
    if(!user.valPassword(password)){
        res.send('Wrong Password');
    }
    res.send('Success');
    });
});


router.post('/signup', function(req,res){
    var email =req.body.email;
    var password = req.body.password;
    var errors = req.validationErrors();
    console.log("email" ,email);
        console.log("password" ,password);

    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        
    }

    User.findOne({'email':email},function(err,user){
    if(err){
        res.send(err);       
    }
    if(user){
        res.send('Email is already in use');
    }
    var newUser = new User();
    newUser.email= email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err,result){
        if(err){
            res.send(err);
        }
        res.send('Success');
    })
    });
});

router.get('/products', function(req, res, next) {
    //var successMsg = req.flash('success')[0];
    Product.find(function(err,docs){
        /*var products = [];
        for(var i=0;i<docs.length;i++){
            products.push(docs);
        }*/
        res.json(docs);
    });
  
});

router.post('/checkout',function(req,res, next){

    var order = new OrderAndroid({
        user: req.body.email,
        cart: req.body.items,
        address: req.body.address,
        name: req.body.name
    });
    order.save(function(err,result){ 
    res.send("Success");
    });
});




module.exports = router;
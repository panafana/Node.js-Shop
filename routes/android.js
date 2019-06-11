var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');
var Cart = require('../models/cart');
var Order = require('../models/order');
var User = require('../models/user');

router.post('/signin', function(req,res){
    var email =req.params.email;
    var password = req.params.password;
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
    var email =req.params.email;
    var password = req.params.password;
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




module.exports = router;
var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');
var Cart = require('../models/cart');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function(err,docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0;i<docs.length;i+=chunkSize){
            productChunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/index', { title: 'Eshop', products: productChunks, successMsg:successMsg,noMessages: !successMsg });
    });
  
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){     
        cart.add(product, product.id);
        req.session.cart = cart;
        //console.log(req.session.cart);
        res.redirect('/');
        
    });
});

router.get('/shopping-cart',function(req,res,next){
    if(!req.session.cart){
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    console.log(req.session.cart);
    res.render('shop/shopping-cart', {products:cart.generateArray(),totalPrice:cart.totalPrice});
    
});

router.get('/checkout',function(req,res,next){
    if(!req.session.cart){
        return res.redirect('shop/shopping-cart');
    }
    var errMsg = req.flash('error')[0];
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout',{total:cart.totalPrice});
});

router.post('/checkout',function(req,res, next){
    if(!req.session.cart){
        return res.redirect('shop/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name
    });
    order.save(function(err,result){ 
    req.flash('success','Successfully bough product(s)!');
    req.session.cart = null;
    res.redirect('/');
    });
});

router.get('/remove-one/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){     
        cart.removeOne(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        if(!cart.generateArray().length>0){
            req.session.cart = {};
            res.render('shop/shopping-cart', {products:[],totalPrice:0});
        }else{
             res.render('shop/shopping-cart', {products:cart.generateArray(),totalPrice:cart.totalPrice});
        }
        
    });
});

router.get('/remove-all/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product){     
        cart.removeAll(product, product.id);
        req.session.cart = cart;
        //console.log(req.session.cart);
        if(!cart.generateArray().length>0){
            req.session.cart = {};
            res.render('shop/shopping-cart', {products:[],totalPrice:0});
        }else{
             res.render('shop/shopping-cart', {products:cart.generateArray(),totalPrice:cart.totalPrice});
        }
       
    });
});

module.exports = router;

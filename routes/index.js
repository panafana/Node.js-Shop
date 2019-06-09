var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var passport = require('passport');
var Cart = require('../models/cart');


/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function(err,docs){
        var productChunks = [];
        var chunkSize = 3;
        for(var i=0;i<docs.length;i+=chunkSize){
            productChunks.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/index', { title: 'Eshop', products: productChunks });
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
    req.flash('success','Successfully bough product(s)!');
    req.cart = null;
    res.redirect('/');
});

module.exports = router;

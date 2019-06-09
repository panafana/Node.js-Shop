var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
    imagePath: 'https://i.imgur.com/eOtEAB7.jpg',
    title: 'Tomb Raider',
    description: 'Good Game!',
    price : 20
    }),
    new Product({
    imagePath: 'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-game-covers-2016/large/far-cry-primal-box-art.jpg?1384968217',
    title: 'Far Cry Primal',
    description: 'Better Game!',
    price : 30
    }),
    new Product({
    imagePath: 'https://board.sonicstadium.org/applications/core/interface/imageproxy/imageproxy.php?img=https://images-na.ssl-images-amazon.com/images/I/71y3rzfuUlL._AC_SX430_.jpg&key=ab4a6028b234a8830fa824e9cacef82d655639ba753ef80e8d35a03441685b9c',
    title: 'Zelda Breath of the Wild',
    description: 'Best Game!',
    price : 15
    }),
    new Product({
    imagePath: 'https://nerdburglars.net/wp-content/uploads/2016/03/Doom-2016-Xbox-One-Cover-Art-793x1024.jpg',
    title: 'Doom',
    description: 'Gore Game!',
    price : 33
    }),
    new Product({
    imagePath: 'https://cdn.tutsplus.com/psd/uploads/legacy/psdtutsarticles/linkb_60vgamecovers/42.jpg',
    title: 'Fallout 3',
    description: 'Survival Game!',
    price : 40
    }),
    new Product({
    imagePath: 'https://cdn3.spong.com/pack/f/o/fortnite442303l/_-Fortnite-Xbox-One-_.jpg',
    title: 'Fortnite',
    description: 'Bad Game!',
    price : 5
    })
];

var done = 0;

for(var i=0; i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done==products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

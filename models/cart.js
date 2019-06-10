module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    
    this.removeOne = function(item,id){
        var storedItem = this.items[id];
        storedItem.qty--;
        if(storedItem.qty>0){           
            storedItem.price = storedItem.item.price * storedItem.qty;
            this.totalQty--;
            this.totalPrice-= storedItem.item.price;     
        }else{    
            this.totalQty-=storedItem.qty;
            this.totalPrice-= storedItem.item.price * storedItem.qty;
            storedItem.qty=0;
            storedItem.price = 0;
            delete this.items[id];
        }
        
    }
    
    this.removeAll = function(item,id){
        var storedItem = this.items[id];
        this.totalQty-=storedItem.qty;
        this.totalPrice-= storedItem.item.price * storedItem.qty;
        storedItem.qty=0;
        storedItem.price = 0;
        delete this.items[id];
    }

    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
            
        }
        return arr;
    };
};
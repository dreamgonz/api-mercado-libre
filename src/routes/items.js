const { Router } = require('express');
const axios = require('axios');
const router = Router();


router.get('/api/items', (req,res) => {
    axios.get('https://api.mercadolibre.com/sites/MLA/search',{ 
        params: {
            q: req.query.q
        }
    })
    .then((response) => {
        let respuesta = new Object();
        
        respuesta.author = new Object();
        respuesta.categories = new Object();
        respuesta.items = new Object();
        
        respuesta.author.name ="Gonzalo";
        respuesta.author.lastname ="Jara";
        
        let items = response.data.results;
        item = [];

        for(keyItem in items){
            price = [];
            for (keyPrice in items){
                price.push({
                    "currency": items[keyPrice].installments.currency_id,
                    "amount": items[keyPrice].installments.amount,
                    "decimals": items[keyPrice].installments.rate
                });
            }
            item.push({
                "id": items[keyItem].id,
                "title": items[keyItem].title,
                "picture": items[keyItem].thumbnail,
                "price": price[keyItem],
                "condition": items[keyItem].condition,
                "free_shipping": items[keyItem].shipping.free_shipping
                
            });    
        }

        respuesta.items = item;
        //respuesta.items.id = items;
        //console.log(respuesta.items);
        res.json(respuesta);
    
        
    })
    .catch(error => {
        console.log(error);
    });
});

router.get('/api/items/:id', (req,res) => {
    axios.all([getItemId(req.params.id), getItemIdDescription(req.params.id)])
    .then(axios.spread(function (itemId, itemIdDescription){
        
        let respuesta = new Object();
        
        respuesta.author = new Object();
        respuesta.item = new Object();
        
        respuesta.author.name ="Gonzalo";
        respuesta.author.lastname ="Jara";
        
        let itemsId = itemId.data;
        let itemsIdDescription = itemIdDescription.data;
        let itemArray = [];
        let priceArray = [];

        priceArray.push({
            "currency": itemsId.currency_id,
            "amount": itemsId.price,
            "decimals": itemsId.price    
        });

        itemArray.push({
            "id": itemsId.id,
            "title": itemsId.title,
            "price": priceArray,
            "picture": itemsId.pictures[0].url,
            "condition": itemsId.condition,
            "free_shipping": itemsId.shipping.free_shipping,
            "sold_quantity": itemsId.sold_quantity,
            "description": itemsIdDescription.plain_text
            
        });

        respuesta.item = itemArray;
        
        

        //respuesta.items.id = items;
        //console.log(respuesta.items);
        res.json(respuesta);
    }))
    .catch(error => {
        console.log(error);
    });
});

function getItemId(id){
    return axios.get('https://api.mercadolibre.com/items/' + id);
}

function getItemIdDescription(id){
    return axios.get('https://api.mercadolibre.com/items/' + id + "/description");
}

module.exports = router;
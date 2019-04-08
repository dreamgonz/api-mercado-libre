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

module.exports = router;
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
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
});

module.exports = router;
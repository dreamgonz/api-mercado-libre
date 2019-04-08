const { Router } = require('express');
const router = Router();

router.get('/api/items', (req,res) => {
    let data = [
        {
            "itemid": 1,
            "nombreProducto": "Alicia en el pais de las Maravillas"
        },
        {
            "itemid": 2,
            "nombreProducto": "Ami el niño de las Estrellas"
        }
    ]
    res.json(data);
});

module.exports = router;
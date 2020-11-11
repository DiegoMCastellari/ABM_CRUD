var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

router.get('/', (req,res) => {
    res.render('index')
});

module.exports = router;

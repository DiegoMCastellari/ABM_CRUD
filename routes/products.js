var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.productos);

router.get('/agregar', productController.agregar);
router.post('/agregar', productController.agregarProducto);

router.get('/editar/:id', productController.editar);
router.post('/editar/:id', productController.editarProducto);

router.get('/borrar/:id', productController.borrar);
router.post('/borrar/:id', productController.borrarProducto);

module.exports = router;
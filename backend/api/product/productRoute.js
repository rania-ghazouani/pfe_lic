const productController = require('./productController');
const verifyToken = require('../auth/_utils/verifyToken');

const express= require('express');





const router = express.Router()

const {addProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct, archiveProduct, productsArch } = productController;
const {checkToken, checkTokenAndAdmin, checkUser, getIdFromToken  } = verifyToken



//products

router.post('/product', checkToken, addProduct);
router.get('/products', checkTokenAndAdmin, getAllProducts);
router.get('/product/:id', checkToken,  getOneProduct);
router.put('/product/:id', checkToken, updateProduct);
router.delete('/product/:id', deleteProduct);
router.put('/archive/:id', checkTokenAndAdmin, archiveProduct);
router.get('/archivelist',checkTokenAndAdmin, productsArch)




module.exports = router
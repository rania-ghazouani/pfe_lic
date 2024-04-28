const categoryController = require('./categoryController');

const express= require('express');





const router = express.Router()

const {addCategory, getAllCategories, getOneCategory, updateCategory, deleteCategory} = categoryController;




//categories

router.post('/category', addCategory);
router.get('/categories', getAllCategories);
router.get('/category/:id', getOneCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);





module.exports = router
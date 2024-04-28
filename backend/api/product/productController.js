const productService = require("./productService");
const userService = require("../user/userService");
const verifyToken = require("../auth/_utils/verifyToken")


const addProduct = async(req,res) => {
    try {
        const {prodEnteredId, 
        productName, 
        productQuantity,
        productDescription, 
        productPrice, 
        productMin,
        categoryId} = req.body
        const created = await productService.createProduct({ prodEnteredId, 
            productName, 
            productQuantity,
            productDescription, 
            productPrice, 
            productMin,
            categoryId, 
            userId: req.user.userId, })
        
        return res.status(200).json(created);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


const getAllProducts = async(req,res) => {
    try {
        
        const products = await productService.getAllProducts()
       return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getOneProduct = async(req,res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await productService.getOneProduct({productId})
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateProduct = async(req,res) => {
    try {
        const productId = parseInt(req.params.id)
        const userId = req.user.userId
        const { 
            prodEnteredId,
            productName, 
            productQuantity, 
            productPrice, 
            productMin, 
            isArchived,
            productDescription} = req.body
            
        const updated = await productService.updateProduct({productId, 
            prodEnteredId,
            productName, 
            productQuantity, 
            productPrice,
            isArchived, 
            productMin, 
            productDescription});
            if(userId === updated.userId){
        res.status(200).json(updated);
            } else {
                res.status(401).json("you are not allowed to update this product")
            }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteProduct = async(req,res) => {
    try {
        const productId= parseInt(req.params.id); 
        const deleted = await productService.deleteProduct({productId});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const archiveProduct = async(req,res) => {
    try {
        const productId = parseInt(req.params.id);
        const archive = await productService.archiveProduct({productId});
        res.status(200).json(archive);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const productsArch = async (req, res) => {
    try {
        
        const prodArch = await productService.productsArch()
        res.status(200).json(prodArch);
    } catch (error) {
        res.status(400).json(error.message);
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    archiveProduct,
    productsArch,
  
}
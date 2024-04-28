const categoryService = require("./categoryService")




const addCategory = async(req,res) => {
    try {
        const {categoryName} = req.body
        const created = await categoryService.createCategory({categoryName})
       
        if(categoryName === created.categoryName){
            return res.status(400).json({
                message: "duplicated name"
            });
        } else { 
        return res.status(200).json(created);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}


const getAllCategories = async(req,res) => {
    try {
        const categories = await categoryService.getAllCategories()
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getOneCategory = async(req,res) => {
    try {
        const categoryId = parseInt(req.params.id)
        const category = await categoryService.getOneCategory({categoryId})
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateCategory = async(req,res) => {
    try {
        const categoryId = parseInt(req.params.id)
        const {categoryName} = req.body
        const updated = await categoryService.updateCategory({categoryName, categoryId});
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteCategory = async(req,res) => {
    try {
        const categoryId= parseInt(req.params.id); 
        const deleted = await categoryService.deleteCategory({categoryId});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
}


module.exports = {
    addCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    
}
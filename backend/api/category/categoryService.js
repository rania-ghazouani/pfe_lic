const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
   //Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données
                                     

const createCategory = async({ categoryName}) => {
    try{
    const created = await prisma.categoryProduct.create({
        data: {
            categoryName
        }, 
       
    });
    return created;
}catch(error){
    return error.message
}
}

const getAllCategories = async() =>{
    try{
    const categories = await prisma.categoryProduct.findMany({
        include: {
            products: true
        }
    });
    return categories;
    }catch (error){
       return error.message;
    }
}


const getOneCategory = async({categoryId}) =>{
    try {
        
    const category = await prisma.categoryProduct.findUnique({
        where: {
            categoryId
        },
        include: {
            products: true
        }
    });
    return category;
    }catch(error){
       return error.message;
    }
}


const updateCategory = async({categoryName}) =>{
    try{    
    const updated = await prisma.categoryProduct.update({
            where:{
                categoryId
            },
            data:{
                categoryName
            },
    });
    return updated;
}catch(error){
    return error.message;
}
}

const deleteCategory = async({categoryId}) => {
    try{
    
    const deleted = await prisma.categoryProduct.delete({
        where: {
            categoryId
        },
        include: {
            products: true
        }
    });
    return deleted
    }catch(error){
        return error.message;
    }
}



module.exports ={
    getAllCategories,
    getOneCategory,
    updateCategory,
    createCategory,
    deleteCategory,
   
}
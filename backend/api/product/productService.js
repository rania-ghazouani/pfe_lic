const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();
   //Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données
                                     

const createProduct = async({
    prodEnteredId, 
    productName, 
    productQuantity,
    productDescription, 
    productPrice, 
    productMin,
    userId,
    categoryId
    }) => {
    try{
    
    const created = await prisma.product.create({
        data: {
            prodEnteredId, 
        productName, 
        productQuantity,
        productDescription, 
        productPrice, 
        productMin,
        categoryId,
        userId
        }, 
        
    });
    return created;
}catch(error){
    return error.message
}
}

const getAllProducts = async() =>{
    try{
    const products = await prisma.product.findMany({
        select:{
            category:{
                select: {
                    categoryName: true
                },
            },
            user:{
                select:{
                    userName: true
                }
            },
                productName: true,
                prodEnteredId: true, 
                isArchived: true,
                productQuantity: true,
                productDescription: true, 
                productPrice: true, 
                productMin: true,
                categoryId: true,
                creationDate: true,
                updateDate: true,
                userId: true,
        },
        /*include: {
            alerts: true
        }*/
       
    });
    return products;
    }catch (error){
       return error.message;
    }
}


const getOneProduct = async({productId}) =>{
    try {
        
    const product = await prisma.product.findUnique({
        where: {
            productId
        },
        select:{
            category:{
                select: {
                    categoryName: true
                },
            },
            user:{
                select:{
                    userName: true
                }
            },
                productName: true,
                prodEnteredId: true, 
                isArchived: true,
                productQuantity: true,
                productDescription: true, 
                productPrice: true, 
                productMin: true,
                categoryId: true,
                creationDate: true,
                updateDate: true,
                userId: true
        }
    });
    return product;
    }catch(error){
       return error.message;
    }
}


const updateProduct = async({productId, 
    prodEnteredId,
    productName, 
    productQuantity, 
    productPrice, 
    productMin,  
    destination,
    isArchived,
    productDescription}) =>{
    try{    
    
    const updated = await prisma.product.update({
            where:{
                productId
            },
            data:{
                prodEnteredId,
                productName, 
            productQuantity, 
            productPrice, 
            productMin, 
            destination,
            isArchived,
            productDescription
            },
    });
    return updated;
}catch(error){
    return error.message;
}
}

const deleteProduct = async({productId}) => {
    try{
    
    const deleted = await prisma.product.delete({
        where: {
            productId
        },
    });
    return deleted
    }catch(error){
        return error.message;
    }
}

const archiveProduct = async({productId}) => {
    try {
        const upd = await prisma.product.update({
            where: {
                productId
            },
            data: {
                isArchived: true
            }
        });
        return upd
    } catch (error) {
        return error.message;
    }
}

const productsArch = async() => {
    try{
        const arch = await prisma.product.findMany({
            where: {
                isArchived: true
            }
        })
        return arch
    } catch (error) {
        return error.message;
    }
}


const findMin = async({productId}) => {
    try {
        const f = await prisma.product.findFirst({
            where:{
                productId
            },
           select: {
               productQuantity: true,
               productMin: true,
               productId: true,
           }
        });
        return f;
    } catch (error) {
        return error.message;
    }
}



module.exports ={
    getAllProducts,
    getOneProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    archiveProduct,
    productsArch,
    findMin,
    
}
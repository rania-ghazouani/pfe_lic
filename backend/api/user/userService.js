const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
   //Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données
                                     



const getAllUsers = async() =>{
    try{
    const users = await prisma.user.findMany({
        include: {
            products: true
        }
    });
    return users;
    }catch (error){
       return error.message;
    }
}


const getOneUser = async({userId}) =>{
    try {
        
    const user = await prisma.user.findUnique({
        where: {
            userId
        },
    });
    return user;
    }catch(error){
       return error.message;
    }
}


const updateUser = async({userId,email,  userName, pwd}) =>{
    try{    
    
    const updated = await prisma.user.update({
            where:{
                userId
            },
            data:{
                userName,
                email,
                pwd
            },
    });
    return updated;
}catch(error){
    return error.message;
}
}

const deleteUser = async({userId}) => {
    try{
    
    const deleted = await prisma.user.delete({
        where: {
            userId
        },
    });
    return deleted
    }catch(error){
        return error.message;
    }
}

const userName = async({userId, userName}) => {
    try{
        const username = await prisma.user.findUnique({
            where:{
                userId
            },
            select:{
                userName: true
            }
        })
        return username
    } catch(error) {
        return error.message;
    }
}

module.exports ={
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    userName
}
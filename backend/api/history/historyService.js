const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
//Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données




//for creation
const createHistory = async ({productId, userIdCreator, userIdEditor, status, exitDate, entryDate, userIdDest}) => {
    try {
        const created = await prisma.history.create({
            data:{
                productId, 
                userIdCreator,
                userIdEditor,
                status,
                exitDate,
                entryDate,
                userIdDest
            }
            });
        return created;
    } catch (error) {
        return error.message
    }
}


//for exit
/*const upHistory = async ({productId, userIdEditor}) => {
    try {
        const created = await prisma.history.create({
            data:{
                productId, 
                userIdEditor,
            }
            });
        return created;
    } catch (error) {
        return error.message
    }
}*/

const getAllhistories = async () => {
    try {
        const histories = await prisma.history.findMany({
            select:{
                
                product:{
                    select:{
                        productId: true,
                        productName: true,
                        creationDate: true,
                        
                    }
                },
                historyId: true,
                status: true,
                exitDate: true,
                entryDate: true,
                userIdCreator: true,
                userIdEditor: true,
                userIdDest: true
            },
            orderBy:{
                historyId: 'desc'
            }
        });
        return histories;
    } catch (error) {
        return error.message;
    }
}


const getOneHistory = async ({ historyId }) => {
    try {

        const history = await prisma.history.findUnique({
            where: {
                historyId
            },
            include: {
                product: true,

            }
        });
        return history;
    } catch (error) {
        return error.message;
    }
}


const deleteHistory = async ({ historyId }) => {
    try {

        const deleted = await prisma.history.delete({
            where: {
                historyId
            },
            
        });
        return deleted
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getAllhistories,
    getOneHistory,
    createHistory,
    deleteHistory
}
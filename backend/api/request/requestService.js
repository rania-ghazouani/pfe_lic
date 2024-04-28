const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
//Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données


const createRequest = async ({
    note,
    userId,
    interventionId
}) => {
    try {

        const created = await prisma.requestFinalExit.create({
            data: {
                note,
                userId,
                interventionId
            },

        });
        return created;
    } catch (error) {
        return error.message
    }
}

const getAllRequests = async () => {
    try {
        const requests = await prisma.requestFinalExit.findMany();
        return requests;
    } catch (error) {
        return error.message;
    }
}


const getOneRequest = async ({ requestId }) => {
    try {

        const request = await prisma.requestFinalExit.findUnique({
            where: {
                requestId
            }
        });
        return request;
    } catch (error) {
        return error.message;
    }
}


const deleteRequest = async ({ requestId }) => {
    try {

        const deleted = await prisma.requestFinalExit.delete({
            where: {
                requestId
            },
        });
        return deleted
    } catch (error) {
        return error.message;
    }
}


//check if request is done 
const validInvalid = async({requestId}) => {
    try {
        const vd = await prisma.requestFinalExit.update({
            where:{
                requestId
            },
            data:{
                done: true
            }
            
        })
        return vd
    } catch (error) {
       return error.message
    }
}



const invalidRequest= async() => {
    try {
        const inv = await prisma.requestFinalExit.findMany({
            where:{
                done: false
            },
            orderBy:{
                requestId: 'desc'
            }
        })
        return inv
    } catch (error) {
        return error.message
    }
}



module.exports = {
    createRequest,
    getAllRequests,
    getOneRequest,
    deleteRequest,
    validInvalid,
    invalidRequest
}
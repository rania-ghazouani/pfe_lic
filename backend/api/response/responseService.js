const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
//Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données


const createResponse = async ({
    validation,
    requestId
}) => {
    try {
        /*const validation = ["en rebut", ""]
        if (!validation.includes(validation)) {
            return {
                message: "false"
            }
        }*/

        const created = await prisma.response.create({
            data: {
               validation,
               requestId
            },

        });
        return created;
    } catch (error) {
        return error.message
    }
}

const getAllResponses = async () => {
    try {
        const responses = await prisma.response.findMany({
            orderBy: {
                responseId: 'desc'
            }
        });
        return responses;
    } catch (error) {
        return error.message;
    }
}


const getOneResponse = async ({ responseId }) => {
    try {

        const response = await prisma.response.findUnique({
            where: {
                responseId
            },
            select:{
                responseId: true,
                note: true,
                validation: true,
                validationDate: true,
                requestId: true,
                requestFinalExit:{
                    select:{
                        interventionId: true
                    }
                }
            }
        });
        return response;
    } catch (error) {
        return error.message;
    }
}


const deleteResponse = async ({ responseId }) => {
    try {

        const deleted = await prisma.response.delete({
            where: {
                responseId
            },
        });
        return deleted
    } catch (error) {
        return error.message;
    }
}

const refuseResp = async({note, requestId}) => {
    try {
        const ref = await prisma.response.create({
            data:{
                note,
                requestId,
                validation: 'refus'
            }
        })
        return ref
    } catch (error) {
        return error.message;
    }
}



const seen = async({responseId}) => {
    try {
        const s = await prisma.response.update({
            where:{
                responseId
            },
            data:{
                seen: true
            },
        })
        return s
    } catch (error) {
        return error.message;
    }
}

const getRespNotSeen = async() => {
    try {
        const get = await prisma.response.findMany({
            where:{
                seen: false
            }
        })
        return get
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    createResponse,
    deleteResponse,
    getAllResponses,
    getOneResponse,
    refuseResp,
    seen,
    getRespNotSeen
}
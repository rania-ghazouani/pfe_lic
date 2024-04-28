const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();




const createAlert = async({notificationObject}) => {
    try {
       const alert = await prisma.notification.create({
            data: {
               notificationObject,
            }
        })
        return alert;
    } catch (error) {
       error.message
    }
}
const getAllAlerts = async() => {
    try {
       const al = await prisma.notification.findMany();
        return(al)
    } catch (error) {
        error.message
    }
}

const getOneAlert = async({notificationId}) => {
    try {
        one = await prisma.notification.findUnique({
            where:{
                notificationId
            }
        })
    } catch (error) {
        
    }
}




module.exports = {
    getAllAlerts,
    getOneAlert,
    createAlert
}


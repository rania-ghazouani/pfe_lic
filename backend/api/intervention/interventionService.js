const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient();
   //Prisma Client est un générateur de requêtes auto-généré et de type sécurisé adapté à vos données
                                     

const createCard = async({
    atelier, 
    demandeur, 
    ligne,
    date, 
    decriptionProbleme, 
    action,
    heureAppelServiceSupport,
    heureValidation,
    intervenant,
    production,
    matricule
    }) => {
    try{
    
    const created = await prisma.intervention.create({
        data: {
            atelier, 
            demandeur, 
            ligne,
            date, 
            decriptionProbleme, 
            action,
            heureAppelServiceSupport,
            heureValidation,
            intervenant,
            production,
            matricule
        }, 
        
    });
    return created;
}catch(error){
    return error.message
}
}

const getAllCards = async() =>{
    try{
    const interventions = await prisma.intervention.findMany();
    return interventions;
    }catch (error){
       return error.message;
    }
}


const getOneCard = async({interventionId}) =>{
    try {
        
    const card = await prisma.intervention.findUnique({
        where: {
            interventionId
        },
    });
    return card;
    }catch(error){
       return error.message;
    }
}


const updateCard = async({interventionId,
    atelier, 
    demandeur, 
    ligne,
    date, 
    decriptionProbleme, 
    action,
    heureAppelServiceSupport,
    heureValidation,
    intervenant,
    production,
    matricule}) =>{
    try{    
    
    const updated = await prisma.intervention.update({
            where:{
                interventionId
            },
            data:{
                atelier, 
    demandeur, 
    ligne,
    date, 
    decriptionProbleme, 
    action,
    heureAppelServiceSupport,
    heureValidation,
    intervenant,
    matricule,
    production
            },
    });
    return updated;
}catch(error){
    return error.message;
}
}

const deleteCard = async({interventionId}) => {
    try{
    
    const deleted = await prisma.intervention.delete({
        where: {
            interventionId
        },
    });
    return deleted
    }catch(error){
        return error.message;
    }
}

module.exports ={
    getAllCards,
    getOneCard,
    updateCard,
    createCard,
    deleteCard
}
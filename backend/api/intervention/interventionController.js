const interventionService = require("./interventionService");
const userService = require("../user/userService");


const addCard = async(req,res) => {
    try {
        const {atelier, 
            demandeur, 
            ligne,
            date, 
            decriptionProbleme, 
            action,
            heureAppelServiceSupport,
            heureValidation,
            production,
            intervenant,
            matricule} = req.body
        const created = await productService.createProduct({ atelier, 
            demandeur, 
            ligne,
            date, 
            decriptionProbleme, 
            action,
            production,
            heureAppelServiceSupport,
            heureValidation,
            intervenant,
            matricule})
        
        return res.status(200).json(created);
        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


const getAllCards = async(req,res) => {
    try {
        const cards = await interventionService.getAllCards()
       return res.status(200).json(cards);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const getOneCard = async(req,res) => {
    try {
        const interventionId = parseInt(req.params.id)
        const intervention = await interventionService.getOneCard({interventionId})
        res.status(200).json(intervention);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const updateCard = async(req,res) => {
    try {
        const interventionId = parseInt(req.params.id)
        
        const { 
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
            matricule} = req.body
        const updated = await productService.updateProduct({ interventionId,
            atelier, 
            demandeur, 
            ligne,
            date, 
            decriptionProbleme, 
            action,
            heureAppelServiceSupport,
            heureValidation,
            production,
            intervenant,
            matricule});
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteCard = async(req,res) => {
    try {
        const interventionId= parseInt(req.params.id); 
        const deleted = await productService.deleteCard({interventionId});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
module.exports = {
    addCard,
    getAllCards,
    getOneCard,
    updateCard,
    deleteCard
}
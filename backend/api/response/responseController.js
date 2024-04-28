const responseService = require("./responseService");
const interventionService = require("../intervention/interventionService");
const requestService = require("../request/requestService")



const addResponse = async(req,res) => {
    try {
        const {validation,
            requestId} = req.body
        const created = await responseService.createResponse({validation, requestId})
            
        return res.status(200).json(created);
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}


const getAllResponses = async(req,res) => {
    try {
        const responses = await responseService.getAllResponses()
        res.status(200).json(responses);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getOneResponse = async(req,res) => {
    try {
        const responseId = parseInt(req.params.id)
        const response = await responseService.getOneResponse({responseId})
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}



const deleteResponse = async(req,res) => {
    try {
        const responseId= parseInt(req.params.id); 
        const deleted = await responseService.deleteResponse({responseId});
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const refuseResp = async(req, res) => {
    try {
        const {note, requestId, interventionId} = req.body
        const refs = await responseService.refuseResp({note, requestId})
        if(refs){
            const requestId = refs.requestId
            const updProdCaseRef = await interventionService.updProdCaseRef({interventionId})
            const valid = await requestService.validInvalid({requestId})
            return res.json({
                success: 1,
                message: `La demande a été refusée.`
            })
        }
      
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const seen = async(req, res) => {
    try {
        
        const responseId = parseInt(req.params.id)
        const sn = await responseService.seen({responseId})
        res.status(200).json(sn)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getRespNotSeen = async(req, res) => {
    try {
        const g = await responseService.getRespNotSeen()
        return res.status(200).json(g)
    } catch (error) {
        res.status(400).json(error.message);
    }
}


module.exports = {
    addResponse,
    getAllResponses,
    getOneResponse,
    deleteResponse,
    refuseResp,
    seen,
    getRespNotSeen
}
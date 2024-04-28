const requestService = require("./requestService")




const addRequest = async(req,res) => {
    try {
        const {note, transactionType} = req.body
        const created = await requestService.createRequest({note, transactionType})
       
        return res.status(200).json(created);
        
    } catch (error) {
        res.status(400).json(error.message);
    }
}


const getAllRequests = async(req,res) => {
    try {
        const requests = await requestService.getAllRequests()
        return res.status(200).json(requests);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getOneRequest = async(req,res) => {
    try {
        const requestId = parseInt(req.params.id)
        const request = await requestService.getOneRequest({requestId})
        return res.status(200).json(request);
    } catch (error) {
        res.status(400).json(error.message);
    }
}



const deleteRequest = async(req,res) => {
    try {
        const requestId= parseInt(req.params.id); 
        const deleted = await requestService.deleteRequest({requestId});
        return res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const invalidRequests = async(req, res) => {
    try {
        const vd = await requestService.invalidRequest()
        return res.status(200).json(vd)
    } catch (error) {
        res.status(400).json(error.message);
    }
}




module.exports = {
    addRequest,
    getAllRequests,
    getOneRequest,
    deleteRequest,
    invalidRequests
}
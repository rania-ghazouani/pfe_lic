const historyService = require("./historyService")


const addhistory = async (req, res) => {
    try {
        
        const created = await categoryService.createCategory({
            productId, 
            userIdCreator,
            userIdEditor,
            status,
            exitDate,
            entryDate})

        return res.status(200).json(created);
    } catch (error) {
        res.status(400).json(error.message);
    }
}


const getAllhistories = async (req, res) => {
    try {
        const histories = await historyService.getAllhistories()
        res.status(200).json(histories);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const getOneHistory = async (req, res) => {
    try {
        const historyId = parseInt(req.params.id)
        const history = await historyService.getOnehistory({ historyId })
        res.status(200).json(history);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const deleteHistory = async (req, res) => {
    try {
        const historyId = parseInt(req.params.id)
        const history = await historyService.deleteHistory({ historyId })
        res.status(200).json(history);
    } catch (error) {
        res.status(400).json(error.message);
    }
}



module.exports = {
    addhistory,
    getAllhistories,
    getOneHistory,
    deleteHistory
}
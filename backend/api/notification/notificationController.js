const notificationService = require('./notificationService');
const productService = require('../product/productService')






const get = async (req, res) => {
    try {

        const productId = parseInt(req.params.id);
        const min = await productService.findMin({ productId })
        res.status(200).json(min)
    } catch (error) {
        res.status(400).json(error.message);

    }
}


const addAlert = async (req, res) => {
    try {
            const { notificationObject } = req.body
            const noti = await notificationService.createAlert({notificationObject});

            return res.status(200).json(noti);
        
    } catch (error) {
       return  res.status(400).json(error.message);
    }
}


const getAllAlerts = async (req, res) => {
    try {
        const notif = await notificationService.getAllAlerts()
        
        return res.status(200).json(notif);
    } catch (error) {
       return res.status(400).json(error.message);
    }
}

const getOneAlert = async (req, res) => {
    try {
        const notificationId = parseInt(req.params.id)
        const notif = await notificationService.getOneAlert({ notificationId })
        
        res.status(200).json(notif);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    getAllAlerts,
    getOneAlert,
    addAlert,
    get
}
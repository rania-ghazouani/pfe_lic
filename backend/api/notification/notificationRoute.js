const notificationController = require('./notificationController');

const express= require('express');





const router = express.Router()

const {getAllAlerts, getOneAlert, addAlert, get} = notificationController;




//alerts

router.get('/alert/:id', getOneAlert);
router.post('/alerte', addAlert)
router.get('/alerts', getAllAlerts);




module.exports = router
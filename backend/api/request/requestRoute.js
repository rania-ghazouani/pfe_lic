const requestController = require('./requestController');

const express= require('express');
const verifyToken = require('../auth/_utils/verifyToken');




const router = express.Router()

const {addRequest, getAllRequests, getOneRequest, deleteRequest, invalidRequests} = requestController;
const { checkToken, checkAdmin, checkAgPro, checkGestStock, checkTech } = verifyToken



//requests

router.post('/request',checkToken, addRequest);
router.get('/requests', checkToken, getAllRequests);
router.get('/request/:id', checkToken, getOneRequest);
//router.delete('/request/:id', deleteRequest);
router.get('/invalidReq', checkToken, invalidRequests)




module.exports = router
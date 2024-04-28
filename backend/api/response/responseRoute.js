const responseController = require('./responseController');
const verifyToken = require('../auth/_utils/verifyToken');
const express= require('express');





const router = express.Router()

const {addResponse, getAllResponses, getOneResponse, deleteResponse, refuseResp, seen, getRespNotSeen} = responseController;
const { checkToken, checkAdmin, checkAgPro, checkGestStock, checkTech } = verifyToken



//categories

router.post('/response', checkToken, addResponse);
router.get('/responses', checkTech, getAllResponses);
router.get('/response/:id',checkToken, getOneResponse);
//router.delete('/response/:id', deleteResponse);
router.post('/refsResp', checkToken, refuseResp);
router.get('/seen/:id', checkToken, seen);
router.get('/notseen', checkToken, getRespNotSeen)




module.exports = router
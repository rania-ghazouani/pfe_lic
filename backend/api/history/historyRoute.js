const historyController = require('./historyController');

const express = require('express');
const verifyToken = require('../auth/_utils/verifyToken');




const router = express.Router()

const { addhistory, getAllhistories, getOneHistory, deleteHistory} = historyController;
const {checkToken, checkAdmin, checkAgPro, checkGestStock, checkTech} = verifyToken



//history

router.post('/history', checkToken, addhistory);
router.get('/histories', checkToken, getAllhistories);
router.get('/history/:id',checkToken, getOneHistory);
router.delete('/history/:id',checkToken, deleteHistory)


module.exports = router
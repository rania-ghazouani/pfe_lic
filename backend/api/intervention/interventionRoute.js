const interventionController = require('./interventionController');
const verifyToken = require('../auth/_utils/verifyToken');

const express= require('express');





const router = express.Router()

const {addCard, getAllCards, getOneCard, updateCard, deleteCard } = interventionController;
const {checkToken, checkTokenAndAdmin, checkUser, getIdFromToken  } = verifyToken



//products

router.post('/intervention',  addCard);
router.get('/interventions', getAllCards);
router.get('/intervention/:id', getOneCard);
router.put('/intervention/:id', updateCard);
router.delete('/intervention/:id', deleteCard)




module.exports = router
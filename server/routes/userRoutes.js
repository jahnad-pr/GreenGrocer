const express = require('express');
const {createAUser,loginUser,googleLog, getUserData, getOTP, conformOTP, updateVerification,getCategories,getCollections } = require('../controllers/userController');
const authMiddleware = require('../middlewares/checkUser');
const router = express.Router();

router.post('/signup',createAUser);
router.post('/login',loginUser);
router.post('/googleLog',googleLog);
router.post('/getOTP',getOTP);
router.post('/conformOTP',conformOTP);
router.post('/addDetails',updateVerification);

router.get('/getUser',authMiddleware,getUserData);
router.get('/getCategories',authMiddleware,getCategories);
router.get('/getCollections/:array',authMiddleware,getCollections);

module.exports = router;

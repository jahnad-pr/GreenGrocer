const express = require('express');
const {createAUser,loginUser,googleLog, getUserData, 
    getOTP, conformOTP, updateVerification, isUerExist, logoutUser } = require('../controllers/userController');
const { getProducts,getCAtegoryProducts } = require('../controllers/config/ProductController')
const { getCategories } = require('../controllers/config/categoryController');
const { getCollections,getCAtegoryCollection } = require('../controllers/config/collectionController');
const { authMiddleware } = require('../middlewares/checkUser');

const router = express.Router();

router.post('/signup',createAUser);
router.post('/login',loginUser);
router.post('/googleLog',googleLog);
router.post('/getOTP',getOTP);
router.post('/conformOTP',conformOTP);
router.post('/addDetails',updateVerification);
router.post('/isUerExist',isUerExist);
router.post('/logoutUser',logoutUser);

router.get('/getUser',authMiddleware,getUserData);
router.get('/getCategories',getCategories);
router.get('/getCollections/:id',getCollections);
router.get('/getCAtegoryProducts/:id',getCAtegoryProducts);
router.get('/getCAtegoryCollctiions/:id',getCAtegoryCollection);
// router.get('/getCollectionProducts/:id',getCollectionProducts);

module.exports = router;

// SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
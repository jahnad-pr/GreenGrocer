const express = require('express');
const {createAUser,loginUser,googleLog, getUserData, 
    getOTP, conformOTP, updateVerification, isUerExist, logoutUser, updateProfile, matchPassword,resetPassword } = require('../controllers/userController');
const { getProducts,getCAtegoryProducts,getProductDetails } = require('../controllers/config/ProductController')
const { upsertAddress,getAdresses } = require('../controllers/config/AdressController')
const { getCategories } = require('../controllers/config/categoryController');
const { addtoCart,checkPorductInCart,getCartItems } = require('../controllers/config/cartController');
const { placeOrder,getOders } = require('../controllers/config/orderController');
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

router.post('/updateProfile',updateProfile);
router.post('/matchPassword',matchPassword);
router.post('/resetPassword',resetPassword);

router.post('/upsertAddress',upsertAddress);
router.get('/getAdresses/:id',getAdresses);

router.post('/placeOrder',placeOrder);
router.get('/getOders/:id',getOders);

router.post('/addtoCart',addtoCart);
router.get('/checkPorductInCart/:prductID',authMiddleware,checkPorductInCart);
router.get('/getCartItems',authMiddleware,getCartItems);

router.get('/getUser',authMiddleware,getUserData);
router.get('/getCategories',getCategories);
router.get('/getProductDetails/:id',getProductDetails);
router.get('/getCollections/:id',getCollections);
router.get('/getCAtegoryProducts/:id',getCAtegoryProducts);
router.get('/getCAtegoryCollctiions/:id',getCAtegoryCollection);
// router.get('/getCollectionProducts/:id',getCollectionProducts);

module.exports = router;
const express = require('express');
const { getCustomers, getAdmins, updateUserAccess,getAdmin,logoutAdmin } = require('../controllers/adminControllers');
// const {  } = require('../controllers/userController')
const { upsertProducts,getProducts,updateProduct } = require('../controllers/config/ProductController')
const { upsertCollection,getCollections,updateCollection } = require('../controllers/config/collectionController')
const { upsertCategory, getCategories, updateCategory, } = require('../controllers/config/categoryController')
const { uploadImages,storage , upload } = require('../controllers/config/utilityController')
const path = require('path');
const { adminAuthMiddleware } = require('../middlewares/checkAdmin');


const router = express.Router();

router.post('/login',getAdmins);



router.get('/getCustomers',adminAuthMiddleware,getCustomers);
router.get('/getCategories',adminAuthMiddleware,getCategories);
router.get('/getCollections',adminAuthMiddleware,getCollections);
router.get('/getProducts',adminAuthMiddleware,getProducts);
router.get('/getAdmin',adminAuthMiddleware,getAdmin);


router.put('/upsertCategory',adminAuthMiddleware,upsertCategory);
router.put('/upsertCollection',adminAuthMiddleware,upsertCollection);
router.put('/upsertProducts',adminAuthMiddleware,upsertProducts);

router.patch('/updateUserAccess',adminAuthMiddleware,updateUserAccess);
router.patch('/updateCategoryAccess',adminAuthMiddleware,updateCategory);
router.patch('/updateCollection',adminAuthMiddleware,updateCollection);
router.patch('/updateProduct',adminAuthMiddleware,updateProduct);

router.post('/uploadImages',adminAuthMiddleware,upload.single('file'),uploadImages);
router.post('/logoutAdmin',adminAuthMiddleware,logoutAdmin);















module.exports = router;

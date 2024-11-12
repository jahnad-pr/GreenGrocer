const express = require('express');
const { getCustomers, getAdmins, updateUserAccess,getAdmin } = require('../controllers/adminControllers');
const { upsertProducts,getProducts,updateProduct } = require('../controllers/config/ProductController')
const { upsertCollection,getCollections,updateCollection } = require('../controllers/config/collectionController')
const { upsertCategory, getCategories, updateCategory, } = require('../controllers/config/categoryController')
const { uploadImages,storage , upload } = require('../controllers/config/utilityController')
const path = require('path');
const { adminAuthMiddleware } = require('../middlewares/checkAdmin');


const router = express.Router();

router.post('/login',getAdmins);



router.get('/getCustomers',getCustomers);
router.get('/getCategories',getCategories);
router.get('/getCollections',getCollections);
router.get('/getProducts',getProducts);
router.get('/getAdmin',adminAuthMiddleware,getAdmin);


router.put('/upsertCategory',upsertCategory);
router.put('/upsertCollection',upsertCollection);
router.put('/upsertProducts',upsertProducts);

router.patch('/updateUserAccess',updateUserAccess);
router.patch('/updateCategoryAccess',updateCategory);
router.patch('/updateCollection',updateCollection);
router.patch('/updateProduct',updateProduct);



router.post('/uploadImages',upload.single('file'),uploadImages);















module.exports = router;

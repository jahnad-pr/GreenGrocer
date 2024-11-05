const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const { getCustomers, getAdmins, updateUserAccess, upsertCategory, getCategories, updateCategory, upsertCollection,
    getCollections,updateCollection,upsertProducts,getProducts,updateProduct,uploadImages } = require('../controllers/adminControllers');
const router = express.Router();

router.use('/uploads/products', express.static(path.join(__dirname, '../public/uploads/products')));  



router.post('/login',getAdmins);



router.get('/getCustomers',getCustomers);
router.get('/getCategories',getCategories);
router.get('/getCollections',getCollections);
router.get('/getProducts',getProducts);


router.put('/upsertCategory',upsertCategory);
router.put('/upsertCollection',upsertCollection);
router.put('/upsertProducts',upsertProducts);

router.patch('/updateUserAccess',updateUserAccess);
router.patch('/updateCategoryAccess',updateCategory);
router.patch('/updateCollection',updateCollection);
router.patch('/updateProduct',updateProduct);





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '../public/uploads/products'); 
       // Move out of the router folder
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });


  const upload = multer({ storage: storage });



router.post('/uploadImages',upload.single('file'),uploadImages);















module.exports = router;

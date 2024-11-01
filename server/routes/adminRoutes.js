const express = require('express');
const { createAdmin, getAdmins } = require('../controllers/adminControllers');
const router = express.Router();

router.post('/login',getAdmins);

module.exports = router;

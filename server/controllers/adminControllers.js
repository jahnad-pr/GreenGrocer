const Admin = require('../models/Auth/adminModel');

// Get all admins
const getAdmins = async (req, res) => {

    
    
    const { email, password } = req.body

    try {
        const admins = await Admin.find({email});
        if(admins.length>0){
            res.json(admins);
        }else{
            res.status(500).json({ message: 'not user found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new admin
const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });

    try {
        const savedAdmin = await admin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAdmins, createAdmin };

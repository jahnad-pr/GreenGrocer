const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Admin = require('../models/Auth/adminModel');
const User = require('../models/Auth/userModel')
const Category = require('../models/other/categoryModels')
const Collection = require('../models/other/collectionModel')
const Product = require('../models/other/productModel')

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

// get limited cutomers
const getCustomers = async(req,res)=>{

    try {

        const UsersData = await User.find({})

        if(UsersData.length<=0){
            res.status(500).json({mission:false,message:'empty users'})
        }else{
            res.status(200).json({mission:true,message:'successfull',data:UsersData})
        }
        
    } catch (error) {

        res.status(500).json({mission:false,message:error.message})
        
    }
}

// upadte the access of user
const updateUserAccess = async(req,res)=>{
    const { uniqeID,updateBool } = req.body
    try {
        const updatedtatus = await User.updateOne({ _id:uniqeID },{ isListed:updateBool })
        console.log(updatedtatus);
        if(updatedtatus.modifiedCount>0){
            return res.status(200).json({mission:true,message:'successfully updaed',uniqeID:uniqeID})
        }
           return res.status(500).json({mission:false,message:'nothing updated'}) 
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }
}


// upsert category
const upsertCategory = async(req,res)=>{

    const { name,_id,items } = req.body

    const filter = _id ? { _id } : { name }

    const isListed = req.body.isListed || false
    const updatedAt = Date.now()
    const createdAt = req.body.createdAt || Date.now()

    try {
        const result = await Category.updateOne( filter, { $set: { name,createdAt,updatedAt,isListed,items } }, { upsert: true, new: true })
        return res.status(200).json({mission:true,message:'successfully updated'})
    } catch (error) {
          return res.status(500).json({mission:false,message: error.message })
      }
    
}

// upadte of category
const updateCategory = async(req,res)=>{

    const { uniqeID,updateBool,action } = req.body

    try {
        if(action==='access'){
            const updatedtatus = await Category.updateOne({ _id:uniqeID },{ isListed:updateBool })
            if(updatedtatus.modifiedCount>0){
                return res.status(200).json({mission:true,message:'successfully updated',uniqeID:uniqeID,action})
            }
            return res.status(500).json({mission:false,message:'nothing updated'}) 

        }else if(action==='delete'){
                const result = await Category.findByIdAndDelete(uniqeID)
                console.log(result);
                
                return res.status(200).json({mission:true,message:'successfully deleted',uniqeID:uniqeID,action})
        }

    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}

// get Categories
const getCategories = async(req,res)=>{

    try {

        const categories = await Category.find({})
        
        if(categories.length<=0){
            res.status(500).json({mission:false,message:'empty categories',data:[]})
        }else{
            res.status(200).json({mission:true,message:'successfull',data:categories})
        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}


// uspert collection
const upsertCollection = async(req,res)=>{

    console.log(req.body);
    

    const { name,_id } = req.body

    const data = req.body

    const filter = _id ? { _id } : { name }

    const isListed = req.body.isListed || false
    const updatedAt = Date.now()
    const createdAt = req.body.createdAt || Date.now()

    try {
        const result = await Collection.updateOne( filter, { $set: { name,createdAt,updatedAt,isListed,...data } }, { upsert: true, new: true })
        return res.status(200).json({mission:true,message:'successfully updated'})
      } catch (error) {
        return res.status(500).json({mission:false,message: error.message })
      }
}


// get collections
const getCollections = async(req,res)=>{

    try {

        const collection = await Collection.find({})
        
        if(collection.length<=0){
            res.status(500).json({mission:false,message:'empty categories',data:[]})
        }else{
            res.status(200).json({mission:true,message:'successfull',data:collection})
        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}


// upadte of category
const updateCollection = async(req,res)=>{

    const { uniqeID,updateBool,action } = req.body
    
    try {
        if(action==='access'){

            
            
            const updatedtatus = await Collection.updateOne({ _id:uniqeID },{ isListed:updateBool })

            if(updatedtatus.modifiedCount>0){

                return res.status(200).json({mission:true,message:'successfully updated',uniqeID:uniqeID,action})
            }
            return res.status(500).json({mission:false,message:'nothing updated'}) 
            
        }else if(action==='delete'){
            
                const result = await Collection.findByIdAndDelete(uniqeID)

                console.log(result);
                
                return res.status(200).json({mission:true,message:'successfully deleted',uniqeID:uniqeID,action})
        }

    } catch (error) {

        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}

const upsertProducts = async(req,res)=>{

    
    
    const { formData , id , action, Urls } = req.body
    console.log(action);
    
    try {
        
        if(action === 'add' ){
            
            const isListed = true
            const updatedAt = Date.now()
            const createdAt = Date.now()
            
            const insertData = { ...formData,isListed,updatedAt,createdAt,pics:Urls }

            const newProduct = await Product.create( insertData )
            

            if(newProduct){
                return res.status(200).json({mission:true,message:'successfully created'})
            }else{
                return res.status(500).json({mission:false,message:'nothing updated'})
            }


        }else if(action === 'update'){

            

        const updatedAt = Date.now()

        const updateData = { ...formData,updatedAt }

        const result = await Product.updateOne( { _id:id }, { $set:updateData })

        if(result.modifiedCount>0){

            return res.status(200).json({mission:true,message:'successfully updated'})
        }
        return res.status(500).json({mission:false,message:'nothing updated'}) 

        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message:error.message})
    }


}


const getProducts = async(req,res)=>{

    try {

        const products = await Product.find({})
        
        if(products.length<=0){

            res.status(500).json({mission:false,message:'empty categories',data:[]})

        }else{

            res.status(200).json({mission:true,message:'successfull',data:products})
        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}

const updateProduct = async(req,res)=>{

    
    
    
    const { uniqeID,updateBool,action } = req.body
    
    try {
        if(action==='access'){
            
            const updatedtatus = await Product.updateOne({ _id:uniqeID },{ isListed:updateBool })

            console.log(updatedtatus);

            if(updatedtatus.modifiedCount>0){

                return res.status(200).json({mission:true,message:'successfully updated',uniqeID:uniqeID,action})
            }

            return res.status(500).json({mission:false,message:'nothing updated'}) 
            
        }else if(action==='delete'){
            
                const result = await Product.findByIdAndDelete(uniqeID)

                console.log(result);
                
                return res.status(200).json({mission:true,message:'successfully deleted',uniqeID:uniqeID,action})
        }

    } catch (error) {

        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}


// Set up Multer to store images in a folder called 'uploads'
const uploadImages = async (req,res)=>{

    console.log(req.body);
  
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    const fileUrl = `http://localhost:3333/admin/uploads/Products/${req.file.filename}`;

    res.send({ url: fileUrl });
  
  
  };


module.exports = { getAdmins, getCustomers,updateUserAccess,upsertCategory,getCategories,updateCategory
    ,upsertCollection,getCollections,updateCollection,upsertProducts,getProducts,updateProduct,uploadImages };

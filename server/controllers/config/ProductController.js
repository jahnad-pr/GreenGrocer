const Product = require('../../models/other/productModel')



module.exports.upsertProducts = async(req,res)=>{

    
    
    const { formData , id , action, Urls } = req.body
    // console.log(req.body);
    
    try {
        
        if(action === 'add' ){
            
            const isListed = true
            const updatedAt = Date.now()
            const createdAt = Date.now()

            
            
            const insertData = { ...formData,isListed,updatedAt,createdAt }
            // console.log(insertData);

            const newProduct = await Product.create( insertData )
            

            if(newProduct){
                return res.status(200).json({mission:true,message:'successfully created'})
            }else{
                return res.status(500).json({mission:false,message:'nothing updated'})
            }


        }else if(action === 'update'){

            

        const updatedAt = Date.now()

        const updateData = { ...formData,updatedAt }

        
        const result = await Product.updateOne( { _id:formData._id }, { $set:updateData })

    

        if(result.modifiedCount>0){

            return res.status(200).json({mission:true,message:'successfully updated'})
        }
        return res.status(500).json({mission:false,message:'nothing updated'}) 

        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message:error.message})
    }


}





module.exports.getProducts = async(req,res)=>{
    

    try {

        const products = await Product.find({})

        // console.log(products);
        
        
        if(products.length<=0){

            res.status(500).json({mission:false,message:'empty categories',data:[]})

        }else{

            if(products[0].isListed){

                res.status(200).json({mission:true,message:'successfull',data:products})

            }

        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}



module.exports.getCAtegoryProducts = async(req,res)=>{

    const id = req.params.id
    

    try {

        const products = await Product.find({  category:id }).populate('category','name' )

        
        if(products.length<=0){

            res.status(500).json({mission:false,message:'empty categories',data:[]})

        }else{

            if(products[0].isListed){

                res.status(200).json({mission:true,message:'successfull',data:products})

            }

        }
        
    } catch (error) {
        return res.status(500).json({mission:false,message: error.messgae }) 
    }

}






module.exports.updateProduct = async(req,res)=>{

    
    
    
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



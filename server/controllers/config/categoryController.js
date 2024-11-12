const Category = require('../../models/other/categoryModels')



// upsert category
module.exports.upsertCategory = async(req,res)=>{


    const { name,_id,items } = req.body

    const filter = _id ? { _id } : { name }    

    const isListed = req.body.isListed || true
    const updatedAt = Date.now()
    const createdAt = req.body.createdAt || Date.now()

    try {
        const result = await Category.updateOne( filter, { $set: { name,createdAt,updatedAt,isListed,items } }, { upsert: true, new: true })
        console.log(result);
        
        return res.status(200).json({mission:true,message:'successfully updated'})
    } catch (error) {
          return res.status(500).json({mission:false,message: error.message })
      }
    
}

// upadte of category
module.exports.updateCategory = async(req,res)=>{

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
module.exports.getCategories = async(req,res)=>{

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





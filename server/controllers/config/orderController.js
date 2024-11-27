const Order = require('../../models/other/OrderModel')
const Cart = require('../../models/other/cartModel')
const Product = require('../../models/other/productModel')


module.exports.placeOrder = async (req, res) => {

    const OrderData = req.body

    console.log(OrderData);
    


    try {

        const result = await Order.create(OrderData)

        await Cart.updateOne({ user: OrderData.user }, { $set: { items: [] } })

        OrderData.items.forEach(async (item) => {
            await Product.updateOne(
                { _id: item.product },
                { $inc: { stock : -item.quantity } }
            );
        });

        if(result){

            return res.status(200).json('Order succsffuly')
        }
            return res.status(400).json('Order Not confirmed')

    } catch (error) {

        return res.status(400).json(error.message)
    }
}



module.exports.getOders = async (req, res) => {

    const user = req.params.id || null

    try {
        let result = []


        
        if(user!=='undefined'){
            result = await Order.find({user}).populate('items.product').populate('items.product.category','name')
        }else{
            result = await Order.find({}).populate('items.product').populate('user','username')
        }
        

        if(result){
            return res.status(200).json(result)
        }
            return res.status(400).json('No Orders')

    } catch (error) {

        return res.status(400).json(error.message)
    }
}


module.exports.updateOrderStatus = async (req, res) => {

    const { id:_id, value:order_status } = req.body

    try {

        const result = await Order.updateOne({ _id },{ $set:{ order_status } })

        if(result.modifiedCount>0){

            return res.status(200).json('Successfully updated')

        }else{

            return res.status(400).json('Somting went wrong')
        }
        
        
    } catch (error) {

        return res.status(400).json(error.message)
    }
    
}

module.exports.cancelOrder = async (req, res) => {

    const { cancelId } = req.body

    console.log(cancelId);
    

    try {

        const result = await Order.updateOne({ _id:cancelId },{ $set:{ order_status:'Cancelled' } })

        if(result.modifiedCount>0){

            return res.status(200).json('Successfully Cancelled')

        }else{

            return res.status(400).json('Somting went wrong')
        }
        
        
    } catch (error) {

        return res.status(400).json(error.message)
    }
    
}
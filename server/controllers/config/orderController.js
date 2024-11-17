const Order = require('../../models/other/OrderModel')




module.exports.placeOrder = async (req, res) => {

    const OrderData = req.body


    try {
        const result = await Order.create(OrderData)

        if(result){
            return res.status(200).json('Order succsffuly')
        }
            return res.status(400).json('Order Not confirmed')

    } catch (error) {

        return res.status(400).json(error.message)
    }
}



module.exports.getOders = async (req, res) => {

    const user = req.params.id

    try {
        const result = await Order.find({user}).populate('items.product','name from')

        if(result){
            return res.status(200).json(result)
        }
            return res.status(400).json('No Orders')

    } catch (error) {

        return res.status(400).json(error.message)
    }
}
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_fEUsBf8xUYEXU0',
    key_secret: 'A75XO6hTLIgwUyZe2NS2BZVF'
});

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", 'A75XO6hTLIgwUyZe2NS2BZVF')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.status(200).json({ verified: true });
        } else {
            res.status(400).json({ verified: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    verifyPayment
};

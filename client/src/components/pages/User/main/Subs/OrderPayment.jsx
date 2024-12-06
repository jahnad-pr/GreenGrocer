import React, { useEffect, useState } from 'react';
import upi from '../../../../../assets/images/upi.png'
import netb from '../../../../../assets/images/netb.png'
import code from '../../../../../assets/images/cod.png'
import deb from '../../../../../assets/images/debo.png'
import roz from '../../../../../assets/images/roz.png'
import coin from '../../../../../assets/images/gCoin.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../../../../../services/User/userApi';
import { toast } from 'react-hot-toast';
import { loadRazorpayScript, createRazorpayOrder, initializeRazorpayPayment } from '../../../../../utils/razorpay';

const OrderPayment = ({userData}) => {
  const [placeOrder, { error, data }] = usePlaceOrderMutation();
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [currentData, setCurrentData] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation()
  const navigator = useNavigate()

  useEffect(() => {
    if(data){ navigator('/user/success') } 
  }, [data])

  useEffect(() => {
    if(location?.state?.order){
      console.log("Order data:", location.state.order);
      setCurrentData(location.state.order)
    }
  }, [location])

  const handleRazorpayPayment = async () => {
    try {
      setIsLoading(true);
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      const orderData = await createRazorpayOrder(currentData.price);

      initializeRazorpayPayment({
        orderData,
        keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
        userData,
        onSuccess: async (paymentDetails) => {
          const orderData = {
            user: userData._id,
            delivery_address: currentData.address,
            payment_method: selectedMethod,
            coupon: '',
            items: currentData.items,
            price: {
              grandPrice: currentData.price,
              discountPrice: 0
            },
            order_id: generateOrderId(),
            time: Date.now(),
            total_quantity: currentData.items?.reduce((acc, data) => acc += data.quantity, 0),
            order_status: 'Processed',
            payment_status: 'completed',
            razorpay_payment_id: paymentDetails.razorpay_payment_id,
            razorpay_order_id: paymentDetails.razorpay_order_id
          };

          await placeOrder(orderData).unwrap();
          toast.success('Payment successful! Order placed.');
          navigator('/user/success');
        },
        onError: (error) => {
          console.error('Payment error:', error);
          toast.error('Payment failed');
        }
      });
    } catch (error) {
      console.error('Razorpay payment error:', error);
      toast.error('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const placeOrders = async () => {
    try {
      setIsLoading(true);
      
      if (selectedMethod === 'Razorpay') {
        await handleRazorpayPayment();
        return;
      }

      const orderData = {
        user: userData._id,
        delivery_address: currentData.address,
        payment_method: selectedMethod,
        coupon: currentData.coupon,
        items: currentData.items,
        price: {
          grandPrice: currentData.price,
          discountPrice: 0
        },
        order_id: generateOrderId(),
        time: Date.now(),
        total_quantity: currentData.items?.reduce((acc, data) => acc += data.quantity, 0),
        order_status: 'Processed',
        payment_status: selectedMethod === 'Cash on Delivery' ? 'pending' : 'completed',
      };

      await placeOrder(orderData).unwrap();
      toast.success('Order placed successfully!');
      navigator('/user/success');
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'UPI',
      name: 'UPI',
      icon: <img src={upi} alt="UPI" />,
    },
    // {
    //   id: 'Net Banking',
    //   name: 'Net Banking',
    //   icon: <img src={netb} alt="Net Banking" />,
    // },
    {
      id: 'Razorpay',
      name: 'Razorpay',
      icon: <img src={roz} alt="Razorpay" />,
    },
    // {
    //   id: 'Credit / Debit Card',
    //   name: 'Credit / Debit Card',
    //   icon: <img src={deb} alt="Card" />,
    // },
    {
      id: 'Cash on Delivery',
      name: 'Cash on Delivery',
      icon: <img className='' src={code} alt="COD" />,
    },
    {
      id: 'Coin Wallet',
      name: 'Coin',
      icon: <img className='px-12' src={coin} alt="Coin" />,
    },
  ];

  const generateOrderId = (length = 6) => {
    // Get the current timestamp
    const timestamp = Date.now().toString(); // Current time in milliseconds since Jan 1, 1970
    
    // Define the character set: uppercase letters and digits
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';

    // Generate the random part of the order ID
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPart += characters[randomIndex];
    }

    // Combine timestamp and random part
    const orderId = `${timestamp}-${randomPart}`;
    return orderId;
  }

  return (
    <div className="max-w-[96%] w-full mx-auto p-6">
      <div className="w-full h-full px-40">
        {/* Payment amount */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <h1 onClick={()=>console.log(currentData.price)} className="text-[30px] font-bold my-16 mb-8">Payment Method</h1>

          <div className="bg-[#e1e5f0] px-16 py-8 rounded-lg inline-block">
            <div className="text-3xl font-bold text-green-700 lemon-regular">₹ {currentData.price}</div>
            <div className="text-gray-400 font-medium">Grand Total</div>
          </div>
        </div>

        {/* Payment method selection */}
        <div className="mb-8">
          <h3 className="text-gray-600 mb-4">Choose Your Payment Method</h3>
          <div className="grid grid-cols-6 md:grid-cols-6 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`
                  flex flex-col py-10 gap-12 items-center justify-center rounded-[30px] border-2 cursor-pointer transition-all relative
                  ${
                    selectedMethod === method.id
                      ? 'border-red-200 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } 
                `}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center absolute top-5 left-5
                      ${
                        selectedMethod === method.id
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }
                    `}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                  {method.icon}
                </div>
                <div className="text-[18px] font-medium opacity-45">{method.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pay button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={placeOrders}
            disabled={isLoading}
            className={`
              px-16 absolute bottom-20 py-[15px] 
              bg-[linear-gradient(to_left,#0bc175,#0f45ff)] 
              text-[18px] rounded-full text-white font-medium 
              mt-10 w-full max-w-[300px]
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? 'Processing...' : 'Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
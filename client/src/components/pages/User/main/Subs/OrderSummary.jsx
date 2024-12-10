import React, { useEffect, useState } from "react";
import past from '../../../../../assets/images/fast.png'
import normal from '../../../../../assets/images/normal.png'
import eco from '../../../../../assets/images/rco.png'
import { useGetAdressesMutation, useGetAllCouponsMutation } from "../../../../../services/User/userApi";
import { useLocation, useNavigate } from "react-router-dom";
import HoverKing from "../../../../parts/buttons/HoverKing";
import ProductDetailsPopup from "./ProductDetailsPopup";
import { Coupon } from "../../../../parts/Cards/Coupon";
// import useData from "rsuite/esm/InputPicker/hooks/useData";
import { showToast } from '../../../../parts/Toast/Tostify';

export default function OrderSummary({userData}) {

  const [ getAdresses, { isLoading, error, data }, ] = useGetAdressesMutation();
  const [getAllCoupons,{data:couponData}] = useGetAllCouponsMutation()

  useEffect(()=>{ getAllCoupons() },[])
  
  const [adressData,setaddressData] = useState()
  const [itemses,setItems] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState('Fast Delivery');
  const [address, setAddress] = useState();
  const [couponCode, setCode] = useState();
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [CouponDatas, setCouponData] = useState();
  const [originalCouponData, setOriginalCouponData] = useState();
  const [number, setNumber] = useState();
  const [grandTotal, setGrandTotel] = useState();
  const [counDiscount, setCouponDiscount] = useState(0);

  const [summary, setSummary] = useState({
    items: 0,
    discount: 0,
    taxes: 5.3,
    deliveryFee: 40,
    coupon:0,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };
  
  const handleNextProduct = () => {
    const currentIndex = cart.findIndex(item => item.id === selectedProduct.id);
    const nextIndex = (currentIndex + 1) % cart.length;
    setSelectedProduct(cart[nextIndex]);
  };

  const handlePrevProduct = () => {
    const currentIndex = cart.findIndex(item => item.id === selectedProduct.id);
    const prevIndex = (currentIndex - 1 + cart.length) % cart.length;
    setSelectedProduct(cart[prevIndex]);
  };
  
  const resetcoupons = () => {
    if(couponData){
      setOriginalCouponData(couponData);
      setCouponData(couponData.filter( data => {
        if(userData?.couponApplyed[data?.code]<data.usageLimit || !userData?.couponApplyed[data?.code]){
          if(data.minimumPurchase<=grandTotal){
            return data
          }
        }
      } )) 
    }
  }

  useEffect(()=>{ 
    resetcoupons()
  },[couponData,userData,grandTotal])

  useEffect(() => {
    
    if (location?.state?.items) {
      setItems(location?.state?.items)
      const items = location?.state?.items
    
      items?.map((data) => {  
        setCart((prevData) => {
          // Check if the item already exists in the cart
          const isItemExists = prevData.some(
            (item) => item.name === data.product.name && item.quantity === data.quantity
          );
      
          // If item doesn't exist, add it; otherwise, return the previous data
          if (!isItemExists) {
            setSummary((prevData) => ({ 
              ...prevData, 
              items: prevData.items + ((data.quantity/1000)*data.product?.regularPrice),
              discount: prevData.discount + ((data.quantity/1000) * (() => {
                const productVal = data.product?.discount?.value || 0;
                const categoryVal = data.product?.category?.discount?.value || 0;
                
                // Convert both to percentage for comparison
                const productPercent = data.product?.discount?.isPercentage ? productVal : (productVal / data.product?.regularPrice * 100);
                const categoryPercent = data.product?.category?.discount?.isPercentage ? categoryVal : (categoryVal / data.product?.regularPrice * 100);
                
                // Use the discount with higher percentage
                if (productPercent > categoryPercent) {
                    return data.product?.discount?.isPercentage ? 
                        (data.product?.regularPrice * productVal / 100) : productVal;
                } else {
                    return data.product?.category?.discount?.isPercentage ? 
                        (data.product?.regularPrice * categoryVal / 100) : categoryVal;
                }
              })())
            }))
            
            return [
              ...prevData,
              {
                id: prevData.length + 1,
                name: data.product.name,
                quantity: data.quantity || "1 unit",
                price: data.product.regularPrice,
                imgSrc: data.product.pics.one,
                regularPrice: data.product.regularPrice,
                discount: {
                  value: data.product?.discount?.value || 0,
                  isPercentage: data.product?.discount?.isPercentage || false
                },
                category: {
                  discount: {
                    value: data.product?.category?.discount?.value || 0,
                    isPercentage: data.product?.category?.discount?.isPercentage || false
                  }
                }
              },
            ];
          }
          return prevData;
        });
      })
    }
  }, [location?.state?.items])

    useEffect(()=>{
    setGrandTotel((summary.items/2 - summary.discount/2 + (summary.taxes + summary.deliveryFee) - summary.coupon - counDiscount ).toFixed(2))

  },[summary,counDiscount])


  useEffect(()=>{ (async()=>{ if(userData){ await getAdresses(userData?._id) } })() },[userData])

    
  useEffect(()=>{ if(data){
    setaddressData(data) 
    setAddress(data[0])
    } 
  },[data])

  const couponApplyHandler = ()=>{
    if(couponCode.length<=0){
      return showToast('enter coupon code', 'error')
    }
    if(couponCode.length<6){
      return showToast('code should be 6 digit', 'error')
    }
    if(CouponDatas.filter( data => data.code === couponCode ).length>0){
      showToast('coupon applied', 'success')
      setCouponData(CouponDatas.filter( data => data.code !== couponCode ))
      setApplyCoupon(couponData.filter( data => data.code === couponCode )[0])
    }else{
      showToast('invalid coupon', 'error')
    }
  }

  useEffect(()=>{
    if(applyCoupon){
      // alert(grandTotal-applyCoupon.discountAmount)
      setCouponDiscount((applyCoupon.discountType==='fixed'?applyCoupon.discountAmount:(grandTotal/100)*applyCoupon.discountAmount))
    }
  },[applyCoupon])

  return (
    <>
    <div className="w-[96%] h-full">
      <div className="absolute w-full h-full"></div>
      <div className="w-full h-full px-40 py-10 flex gap-20 relative">
        <span className="min-w-[50%]">
          {/* Head */}
          <h1 onClick={()=>console.log(applyCoupon)} className="text-[30px] font-bold my-8">Order Summary</h1>

          {/* order address */}
          <p className="text-[20px] opacity-40 font-medium">
            Choose The Address to Deliver the Products
          </p>

          {/* address seelcter */}
          {  adressData?.length > 0 ? <div className="mt-4">
            <div className="mt-2">
              <select onChange={(e)=>setAddress(e.target.value)} className="px-5 min-w-[700px] p-2 border rounded custom-select">

                { adressData?.map((data)=>{
                  return (
                <option className="text-[15px]">
                  {data?.exactAddress}, <br/>{data?.streetAddress},  INDIA,{data?.state.toUpperCase()}, {data?.pincode}
                </option>

                  )
                }) }
              </select>
            </div>
          </div>: <p onClick={()=>navigate('/user/profile/:12/address')} className="text-[18px] font-medium text-blue-500">Add your adress and coutinue</p>
          }
          <div className="mt-4">
            <label className="block text-[20px] opacity-40 font-medium">
              Enter Your Mobile Number to get updates
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <span className="bg-[#f5efef] rounded-full p-3">+91</span>
              <input
                type="text"
                onChange={(e)=>setNumber(e.target.value)}
                value={userData?.phone||''}
                className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                placeholder="9078454323"
              />
            </div>
          </div>

          <div className="mt-8 w-full space-x-8 bg-[linear-gradient(#f4e7e7,#e3f1e4)] rounded-[30px]">
      <div className="px-10 py-10">
        <h3 className="text-lg font-bold">Items in Cart and Their Pricing</h3>
        <div className="mt-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mt-2 cursor-pointer hover:bg-[#ffffff80] p-2 rounded-lg transition-all" onClick={() => handleProductClick(item)}>
              <div className="flex items-center space-x-2">
                <img src={item.imgSrc} alt={item.name} className="w-8 h-8 object-cover" />
                <span>{item.name}</span>
                <span className="text-gray-500 font-medium">{item.quantity>=1000?item.quantity/1000:item.quantity} {item.quantity>=1000?'Kg':'g'}</span>
              </div>
              <span className="text-green-600 font-bold">₹{(item.quantity/1000)*item.price}</span>
            </div>
          ))}
        </div>

        {/* Subtotal and Summary */}
        <div className="mt-4 bg-[#ffffff60] p-4 rounded-[20px]">
          <div className="flex justify-between">
            <span>Items</span>
            <span className="font-bold">₹ {summary.items/2}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-bold">-₹ {summary.discount/2}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span className="font-bold">₹ {summary.taxes}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-bold">₹ {summary.deliveryFee}</span>
          </div>
          <div className="flex justify-between">
            
            <span>Coupon</span>
            <span className="font-bold">-₹ {counDiscount.toFixed(2)||0}</span>
          </div>
          <div className="flex justify-between mt-4 text-xl font-bold">
            <span>Grand Total</span>
            <span className="text-green-600">₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
        </span>

        <span className="pt-10">
          {/* delivery methode */}
          <div className="w-full">
            <h3 className="text-lg font-bold"></h3>
            <p className="text-[20px] opacity-40 font-medium">Choose the Delivery Method</p>
            {/* container */}
            <div className="mt-4 flex space-x-4">


              {/* first */}
              <div onClick={()=>setDelivery('Fast Delivery')} className="w-1/3 p-5 hover:scale-[1.04] duration-500 text-center border hover:shadow-[0px_0px_20px_#d5dfff] rounded-[40px] shadow relative pt-8 bg-[radial-gradient(#d5dfff,white)]">
                <img
                  src={past}
                  alt="Fast Delivery"
                  className="w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">Fast Delivery</h4>
                <p className="text-gray-500 grid place-items-center text-sm h-[40%] text-center">
                  Fast delivery, bringing your order to you in no time!, speedy
                  delivery, right to your door!
                </p>
                <div className={`absolute left-5 top-5 w-5 h-5 rounded-full border-2 border-[#717fa8] ] p-[3px]`}>
                  <div className={`w-full h-full bg-[#4b5e97] rounded-full ${delivery==='Fast Delivery'?"opacity-100":'opacity-0'}`}></div>
                </div>
              </div>


              {/* second */}
              <div onClick={()=>setDelivery('Normal Delivery')} className="w-1/3 p-5 hover:scale-[1.04] duration-500 text-center border hover:shadow-[0px_0px_20px_#fcffd1] rounded-[40px] shadow relative pt-8 bg-[radial-gradient(#fcffd1,white)]">
                <img
                  src={normal}
                  alt="Fast Delivery"
                  className="w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">Normal Delivery</h4>
                <p className="text-gray-500 text-sm">
                Offering safe and natural normal delivery services through our app – ensuring comfort, care, and expert support for every mother and baby
                </p>
                <div className="absolute left-5 top-5 w-5 h-5 border-[#6f7430] border-2 p-[3px] rounded-full">
                <div className={`w-full h-full bg-[#4b5e97] rounded-full ${delivery==='Normal Delivery'?"opacity-100":'opacity-0'}`}></div>
                </div>
              </div>


              {/* third */}
              <div onClick={()=>setDelivery('Eco Delivery')} className="w-1/3 p-5  hover:scale-[1.04] duration-500 text-center border rounded-[40px] hover:shadow-[0px_0px_20px_#ceffde] relative pt-8 bg-[radial-gradient(#ceffde,white)]">
                <img
                  src={eco}
                  alt="Fast Delivery"
                  className="w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">Eco Delivery</h4>
                <p className="text-gray-500 text-sm">
                Introducing Eco Delivery – a slower, eco-friendly delivery option that puts the safety of nature first, reducing carbon footprints with every order.inspired by Zelova
                </p>
                <div className="absolute left-5 top-5 w-5 h-5 border-[#218342] border-2 p-[3px] rounded-full">
                <div className={`w-full h-full bg-[#4b5e97] rounded-full ${delivery==='Eco Delivery'?"opacity-100":'opacity-0'}`}></div>
                </div>
              </div>


              
            </div>

            <div className="mt-8 mb-3">
              { CouponDatas?.length>0 &&  <>
              <h3 onClick={()=>console.log(CouponDatas)} className="text-lg opacity-40 font-medium mb-5">Available Coupos</h3>
              <div className="inline-flex gap-5 overflow-x-scroll max-w-[700px]">
                  {CouponDatas?.map((coupon, index) => (
                    <Coupon setCode={setCode} index={index} coupon={coupon} />
                    
                  ))}

                </div> </> 
    }
                
            </div>

            <div className="mt-8">
              <h3 className="text-lg mb-3 opacity-40 font-medium">Apply Coupon</h3>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                  value={couponCode}
                  placeholder="Coupon Code"
                  onChange={(e)=>setCode(e.target.value)}
                />
                <button onClick={couponApplyHandler} className={`px-6 py-3 bg-[#498f53] text-white rounded-full ${applyCoupon?'opacity-45':'opacity-100'}`}>
                {/* bg-[linear-gradient(#e7ecff,#dcffe7)] */}
                {applyCoupon?.code?'Applied':'Apply'} 
                </button>
                <button onClick={()=> {
                  if(applyCoupon) {
                    // Restore original coupons with filters
                    if(originalCouponData) {
                      setCouponData(originalCouponData.filter(data => {
                        if(userData?.couponApplyed[data?.code]<data.usageLimit || !userData?.couponApplyed[data?.code]){
                          if(data.minimumPurchase<=grandTotal){
                            return data
                          }
                        }
                      }));
                    }
                    setApplyCoupon(false);
                    setCode('');
                    setCouponDiscount(0);
                  }
                }} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            { adressData?.length > 0 ? (
              <HoverKing 
                event={()=>navigate('/user/payment',{ state:{ add:{ totelProducts:summary.items/2,taxes:summary.taxes,deliveryFee:summary.deliveryFee }, order:{ offerPrice:summary.discount/2,address,price:grandTotal,deliveryMethod:delivery,items:itemses,qnt:location?.state?.qnt,coupon:{ code:applyCoupon.code, amount: counDiscount,usage:userData?.couponApplyed[applyCoupon?.code] || 0 } } } })} 
                styles={'fixed bottom-12 border-0 right-20 rounded-full bg-[linear-gradient(to_left,#0bc175,#0f45ff)] font-bold'} 
                Icon={<i className="ri-arrow-right-line text-[30px] rounded-full text-white"></i>}
              >
                Checkout
              </HoverKing>
            ) : (
              <HoverKing 
                event={()=>navigate('/user/profile/:id/address')} 
                // event={()=>navigate('/user/profile/:id/address', { state: { items: location?.state?.items } })} 
                styles={'fixed bottom-12 border-0 right-64 rounded-full bg-[linear-gradient(to_left,#0bc175,#0f45ff)] font-bold'} 
                Icon={<i className="ri-arrow-left-line text-[30px] rounded-full text-white"></i>}
              >
                Add address
              </HoverKing>
            )}
          </div>
        </span>
      </div>
    </div>

  
    {showPopup && selectedProduct && (
      <ProductDetailsPopup 
        product={selectedProduct}
        onClose={closePopup}
        onNext={handleNextProduct}
        onPrev={handlePrevProduct}
      />
    )}
    </>
  );
}

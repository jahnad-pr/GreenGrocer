import React, { useEffect, useState } from "react";
import star from "../../../../../assets/images/star.png";
import carbg from "../../../../../assets/images/carbg.jpeg";
import { Scale } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import {
    useAddtoCartMutation,
    useCheckPorductInCartMutation,
    useGetCAtegoryProductsMutation,
    useGetProductDetailsMutation,
} from "../../../../../services/User/userApi";
import Product from "../../../../parts/Cards/Product";
import { toast, ToastContainer } from "react-toastify";
import ProductQuantityPopup from "../../../../parts/popups/ProductQuantityPopup";

export default function ProductDetails({ userData }) {
    const [getProductDetails, { error, data }] = useGetProductDetailsMutation();
    const [getCAtegoryProducts, { error: proError, data: proData }] = useGetCAtegoryProductsMutation();
    const [addtoCart, { error: addError, data: addData }] = useAddtoCartMutation();
    const [checkPorductInCart, { data: checkData }] = useCheckPorductInCartMutation();

    const [productsData, setProductsData] = useState([]);
    const [product, setProduct] = useState();
    const [cartStatus, setCartStatus] = useState();
    const [popup, showPopup] = useState(false);
    const [qnt, showQnt] = useState(true);
    const [gotoCart, setGoToCart] = useState(false);
    const [quantity, setQuantity] = useState('1Kg');
    const [cirrentImage, setCurrentImage] = useState();
    const [options, setOptions] = useState(["100g", "250g", "500g", "1Kg", "2Kg", "5Kg", "10Kg", "25Kg", "50Kg", "75Kg", "100Kg", "custom",]);

    const location = useLocation();
    const navigation = useNavigate();

    // Custom content component for the toast
    const ToastContent = ({ title, message }) => (
        <div>
            <strong>{title}</strong>
            <div>{message}</div>
        </div>
    );


    // Show toast notification function
    const showToast = (message, type = "success") => {
        if (type === "success" && message) {
            toast.success(
                type && <ToastContent title={"SUCCESS"} message={message} />,
                {
                    icon: <FaCheckCircle className="text-[20px]" />,
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: "custom-toast-success",
                    bodyClassName: "custom-toast-body-success",
                    progressClassName: "custom-progress-bar-success",
                }
            );
        } else if (message) {
            toast.error(<ToastContent title={"ERROR"} message={message} />, {
                icon: <FaExclamationTriangle className="text-[20px]" />,
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: "custom-toast",
                bodyClassName: "custom-toast-body",
                progressClassName: "custom-progress-bar",
            });
        }
    };

    console.log(checkData);

    useEffect((checkData) => {
        if (checkData) {
            setCartStatus(checkData)
        }

    }, [checkData])

    useEffect(() => {
        if (addData) {
            setGoToCart(true)
            showToast(addData, 'success')

        }
    }, [addData])
    useEffect(() => {
        if (addError?.data) {
            showToast(addError.data, 'error')
        }
    }, [addError])

    useEffect(() => {
        if (location.state.id) {
            getProductDetails(location.state.id).unwrap();
        }
    }, [location]);
    useEffect(() => {
        if (data?.category?._id) {
            getCAtegoryProducts(data.category._id).unwrap();
        }
        setCurrentImage(data?.pics?.one);
    }, [data]);

    useEffect(() => {
        if (data) {
            setProduct(data)
            checkPorductInCart(data?._id)
        };
    }, [data]);
    useEffect(() => {
        if (proData?.data) {
            setProductsData(proData.data.filter((datas) => datas._id !== data._id));
        }
    }, [proData]);

    useEffect(()=>{ 
        if(popup){
          setOptions(prevOptions => prevOptions.filter(option => option !== "custom"))
          setOptions((prev)=>([...prev,"custom"]))
          showPopup(false)
        }else{
        //   if(options.length===12){
    
        //     setSelectedOption(options[3])
        //   }else{
        //     setSelectedOption(options[options.length-2])
        //   }
        }
       },[options])

  function convertToGrams(value) {
    // Check if the value is "custom"
    if (value === "custom") {
        console.error("Custom input detected. Please handle this case separately.");
        return null;
    }

    // Extract the numeric part and the unit (g or kg)
    const match = value.match(/^(\d+)(g|Kg)$/);
    if (!match) {
        console.error("Invalid value format. Expected formats: '100g', '1kg', etc.");
        return null;
    }

    const amount = parseInt(match[1], 10); // Numeric part
    const unit = match[2]; // Unit

    // Convert to grams
    return unit === "Kg" ? amount * 1000 : amount;
}

useEffect(() => {
    if (product?.stock) {
      const quantity = product.stock;
      const thresholds = [
        { value: 100, option: "100g" },
        { value: 250, option: "250g" },
        { value: 500, option: "500g" },
        { value: 1000, option: "1Kg" },
        { value: 2000, option: "2Kg" },
        { value: 5000, option: "5Kg" },
        { value: 10000, option: "10Kg" },
        { value: 25000, option: "25Kg" },
        { value: 50000, option: "50Kg" },
        { value: 75000, option: "75Kg" },
        { value: 100000, option: "100Kg" }
      ];
      
      setOptions(prevOptions => {
        return prevOptions.filter(option => {
          if (option === "custom") return true;
          const threshold = thresholds.find(t => t.option <= option);
          return threshold ? quantity >= threshold.value : true;
        });
      });
    }
  }, [data])

    const addToCartItem = (id) => {

        const userId = userData._id
        const cartData = {
            quantity: convertToGrams(quantity),
            product: id,
        }
        addtoCart({ cartData, userId })
    }

    return (
        <> { popup &&
            <ProductQuantityPopup stock={product?.stock} options={setOptions} showPopup={showPopup} />
          }
         <ToastContainer title="Error" position="bottom-left" />
            <div className={`w-[96%] h-full flex-1 bg-product`}>
                <div className="bg-[#ceb6499c] mix-blend-screen absolute w-full h-full"></div>
                <div className="w-full h-full px-40 py-12 backdrop-blur-3xl">
                    {/* main container */}
                    <div className="w-full h-full flex py-2">
                        <div className="w-[45%] h-full">
                            {/* products titlrs */}
                            <h1 className="text-[45px] leading-none">
                                {product?.name.toUpperCase()}
                            </h1>
                            <p className="text-[18px] opacity-45">
                                {product?.category?.name}
                            </p>
                            <div className="my-10"></div>

                            <p className="text-[20px] mb-5 font-medium">Highlites</p>
                            {/* Highlights of product */}
                            <div className="w-full h-96 flex flex-col pr-16 gap-4">
                                <span className="flex-grow-[3] flex  gap-5">
                                    <div className="bg-[#ffffff7c] h-full w-1/2 px-10 rounded-[22px] py-3 relative">
                                        <p className="text-[18px] mb-2 font-medium">Rating</p>
                                        {/* stars and reviews */}
                                        <span className="flex gap-10">
                                            <div className="flex ">
                                                <img className="w-5 h-5" src={star} alt="" />
                                                <img className="w-5 h-5" src={star} alt="" />
                                                <img className="w-5 h-5" src={star} alt="" />
                                                <img className="w-5 h-5" src={star} alt="" />
                                                <img className="w-5 h-5 grayscale" src={star} alt="" />
                                            </div>
                                            <p className="text-[30px] font-medium absolute top-1/2 -translate-y-1/2 right-12">
                                                4.0
                                            </p>
                                        </span>
                                    </div>

                                    <div className="bg-[#ffffff7c] h-full w-1/2 px-10 rounded-[22px] relative py-3">
                                        <p className="text-[18px] mb-2 font-medium">From</p>
                                        <h1 className="text-[22px] font-medium leading-none">
                                            {product?.from}
                                        </h1>
                                        <i className="ri-caravan-fill text-[30px] font-medium absolute top-1/2 -translate-y-1/2 right-12"></i>
                                    </div>
                                </span>

                                <span className="flex-grow-[7] flex gap-5 relative">
                                    <div className="bg-[#ffffff7c] w-1/2 h-full px-10 rounded-[22px] py-3">
                                        <p className="text-[18px] mb-2 font-medium">Quality</p>
                                        <p className="text-[22px] font-medium leading-none mb-4 text-[#3c6e51]">
                                            {product?.freshness}
                                        </p>
                                        <p className="opacity-45">
                                            Once the customer confirms their order, the wood is cut
                                            specifically for that piece. This approach minimizes waste
                                            and ensures fresh, custom-prepared material for every
                                            order.
                                        </p>
                                    </div>

                                    <div className="bg-[#ffffff7c] w-1/2 h-full px-10 rounded-[22px] py-3 relative">
                                        <p className="text-[18px] mb-2 font-medium">Offer</p>
                                        <p className="text-[38px] mt-4 leadin mb-4 opacity-45 font-bold">
                                            FLAT
                                        </p>
                                        <p className="text-[100px] leading-10 font-bold">20%</p>
                                        <p className="text-[38px] mt-3 text-right opacity-35 font-light">
                                            OFF
                                        </p>
                                        <p className="absolute bottom-4 font-medium opacity-75 left-4">
                                            00:00:00 <span className="opacity-45">remaining</span>
                                        </p>
                                        <p className="absolute top-3 font-medium opacity-75 right-4">
                                            Summer Special
                                        </p>
                                    </div>
                                </span>
                            </div>

                            {/* the realted product section */}
                            {productsData.length > 0 && (
                                <span className="relative">
                                    {/* <div className="w-12 h-12 bg-[#afa57046] absolute top-1/2 -left-16 z-10 justify-center items-center flex rounded-full">
                                    <i className="ri-arrow-left-s-fill text-[35px] -translate-x-[1px]"></i>
                                </div> */}
                                    <div className="w-12 h-12 bg-[#afa57046] absolute top-1/2 -right-4 rotate-180 z-10 justify-center items-center flex rounded-full">
                                        <i className="ri-arrow-left-s-fill text-[35px] -translate-x-[1px]"></i>
                                    </div>

                                    {/* <div className="h-[80%] w-20 bg-[#ceb6499c] absolute right-16 top-[54%] rounded-r-3xl -translate-y-1/2"></div>
                                <div className="h-[80%] w-20 bg-[#ceb6499c] absolute left-0 top-[54%] rounded-l-3xl -translate-y-1/2"></div> */}

                                    <p className="text-[20px] my-5 font-medium">Related</p>
                                    {/* related */}
                                    <div className="overflow-hidden w-[628px] h-auto ">
                                        <div className="w-full  flex flex-col relative">
                                            <span className="flex-grow-[7] flex -translate-x-[33%] gap-2 list ">
                                                {productsData?.map((relatedProduct) => {
                                                    return (
                                                        <div className=" min-w-[200px] hover:ml-3 h-full item py-4 px-5 rounded-[22px]  bg-[linear-gradient(#ffffff65,#ffffff40)]">
                                                            <p className="text-[23px] text-black mb-1 font-medium leading-none">
                                                                {relatedProduct.name}
                                                            </p>
                                                            <p className="text-[18px] text-black mb-2 font-medium opacity-45">
                                                                Apple, {relatedProduct.category.name}
                                                            </p>
                                                            <img
                                                                className="w-36"
                                                                src={relatedProduct?.pic?.one}
                                                                alt=""
                                                            />
                                                        </div>
                                                    );
                                                })}

                                                {/* <div className=" min-w-[200px] h-full item py-4 px-5 rounded-[22px] bg-[linear-gradient(#ffffff65,#ffffff40)]">
                                                <p className="text-[23px] text-black mb-1 font-medium leading-none" >Gavi</p>
                                                <p className="text-[18px] text-black mb-2 font-medium opacity-45">Apple, Fruit</p>
                                                <img className="w-36" src="https://png.pngtree.com/png-clipart/20230126/original/pngtree-fresh-red-apple-png-image_8930987.png" alt="" />
                                            </div>

                                            <div className=" min-w-[200px] h-full item py-4 px-5 rounded-[22px] bg-[linear-gradient(#ffffff65,#ffffff40)]">
                                                <p className="text-[23px] text-black mb-1 font-medium leading-none" >Gavi</p>
                                                <p className="text-[18px] text-black mb-2 font-medium opacity-45">Apple, Fruit</p>
                                                <img className="w-36" src="https://png.pngtree.com/png-clipart/20230126/original/pngtree-fresh-red-apple-png-image_8930987.png" alt="" />
                                            </div>


                                            <div className=" min-w-[200px] h-full item py-4 px-5 rounded-[22px] bg-[linear-gradient(#ffffff65,#ffffff40)]">
                                                <p className="text-[23px] text-black mb-1 font-medium leading-none" >Gavi</p>
                                                <p className="text-[18px] text-black mb-2 font-medium opacity-45">Apple, Fruit</p>
                                                <img className="w-36" src="https://png.pngtree.com/png-clipart/20230126/original/pngtree-fresh-red-apple-png-image_8930987.png" alt="" />
                                            </div> */}
                                            </span>
                                        </div>
                                    </div>
                                </span>
                            )}
                        </div>

                        {/* product image container */}
                        <div className="w-[55%] h-full  flex flex-col relative">

                            <span onClick={() => checkData||gotoCart ? navigation('/user/Cart') : addToCartItem(product._id)} className=" absolute top-10 right-10 text-[25px] group duration-500 w-24 hover:w-48 rounded-full px-8 items-center gap-5  hover:bg-[#ceb64950] flex">
                                <i className="ri-shopping-cart-line duration-500 py-2"></i>
                                <p className="text-[18px] text-nowrap absolute group-hover:block opacity-0 py-2 hover:opacity-100 hidden duration-700 transition-all right-8">{checkData|| gotoCart ? 'Go to Cart' : 'Add to cart'}</p>
                            </span>
                            <i className="ri-bookmark-line absolute top-28 right-10 text-[25px] rounded-full p-5 py-3 "></i>
                            <i className="ri-share-line absolute top-48 right-10 text-[25px] rounded-full p-5 py-3 "></i>

                            <span className="flex-1"></span>
                            <img className="px-60 oscillate" src={cirrentImage} alt="" />
                            <img
                                className="px-60 shadower opacity-40 absolute"
                                src={cirrentImage}
                                alt=""
                            />
                            <span className="flex-1"></span>
                            <div className="w-full max-h-20  flex gap-5   overflow-hidden">

                                <span onClick={() => showQnt(!qnt)} className="inline-flex justify-center items-center gap-5">
                                    <span className="flex items-center justify-center gap-5 bg-[#ceb64930] px-5 rounded-[22px] py-2">
                                        <i className="ri-weight-line text-[25px] "></i>
                                        <p className="font-bold">{quantity}</p>
                                        <i className="ri-arrow-down-wide-fill"></i>

                                    </span>
                                </span>
                                <span className="flex-1"></span>
                                <div
                                    onClick={() => setCurrentImage(product?.pics?.one)}
                                    className="w-20 h-20 border-2 border-[#ceb649] rounded-[22px] p-[10px] flex justify-center items-center"
                                >
                                    <img src={product?.pics?.one} alt="" />
                                </div>

                                <span style={{ transform: !qnt ? 'translateY(-50%)' : 'translateY(0)' }} className="flex h-40 duration-500 flex-col cursor-pointer">
                                    <span className="max-h-20 flex-1 flex items-center justify-center gap-5">
                                        <div
                                            onClick={() => setCurrentImage(product?.pics?.two)}
                                            className="w-20 border-2 h-20 border-[#ceb649] rounded-[22px] p-[10px] flex justify-center items-center cursor-pointer"
                                        >
                                            <img src={product?.pics?.two} alt="" />
                                        </div>
                                        <div
                                            onClick={() => setCurrentImage(product?.pics?.three)}
                                            className="w-20 border-2 h-20 border-[#ceb649] rounded-[22px] p-[10px] mr-8  flex justify-center items-center cursor-pointer"
                                        >
                                            <img src={product?.pics?.three} alt="" />
                                        </div>
                                        <span>
                                            <h1 className="font-bold text-[24px]">₹ {product?.salePrice}</h1>
                                            <p>With inc tax</p>
                                        </span>

                                        <button
                                            onClick={() => navigation("/user/ordersummery", { state: { items: [{ ...product }], qnt: quantity } })}
                                            className="p-5 bg-black rounded-full text-white px-10 ml-5"
                                        >
                                            Buy now
                                        </button>
                                    </span>

                                    <span className="min-h-20 flex-1 gap-5  flex items-center justify-center">
                                        <p className="font-medium ml-4">Offer Price</p>
                                        <span className="flex-1 gap-2"></span>
                                        <span>
                                            <span className="flex ">
                                                <p className="text-[20px] font-bold">₹ {product?.salePrice}   </p>&nbsp;&nbsp;&nbsp;
                                                <s>
                                                    <p className="text-[16px] mt-2 opacity-45">₹ {product?.regularPrice}</p>
                                                </s>
                                            </span>
                                            <span className="flex opacity-45">
                                                <p>₹ {product?.salePrice/10} </p>
                                                <>&nbsp;
                                                    <p> / 100g</p>
                                                </>
                                            </span>


                                        </span>

                                            <span className="">
                                                <p className="text-[20px] font-medium">{product?.stock/1000}<span className="opacity-45"> Kg left</span></p>
                                            </span>

                                        <select
                                            className="text-[20px] text-[#6C6C6C] font-medium focus:outline-none cursor-pointer custom-selecter"
                                            defaultValue="1kg"
                                            onChange={(e) => {e.target.value==='custom'?showPopup(true):setQuantity(e.target.value)}}
                                        >
                                            {options.map((option, index) => (
                                                <option  value={option}>
                                                    {option}
                                                </option>
                                            ))}

                                        </select>

                                    </span>


                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

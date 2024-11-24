import React, { useEffect, useState } from "react";
import aplle from "../../../assets/images/aplle.png"
import ProductQuantityPopup from "../popups/ProductQuantityPopup";
import { useNavigate } from "react-router-dom";
import { useUpdateCartITemMutation } from "../../../services/User/userApi";
import DeletePopup from '../popups/DeletePopup'
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Carts({ data,setProductData,index,showToast }) {

  const [ updateCartITem, { data:dataDelete } ] = useUpdateCartITemMutation();


  const [options, setOptions] = useState([
    "100g",
    "250g",
    "500g",
    "1Kg",
    "2Kg",
    "5Kg",
    "10Kg",
    "25Kg",
    "50Kg",
    "75Kg",
    "100Kg",
    "custom",
    "200g",
    "750g",
    "3Kg",
    "4Kg",
    "6Kg",
    "7Kg",
    "8Kg",
    "9Kg"
  ]);

  // Custom content component for the toast
  const ToastContent = ({ title, message }) => (
    <div>
        <strong>{title}</strong>
        <div>{message}</div>
    </div>
);




  const [popup, showPopup] = useState(false);
  const [dPopup,setDPopup] = useState(false);
  const [deleteData,setDeleteData] = useState({});
  const [qnt, setQnt] = useState(null);
  const [stp, setStp] = useState(null);
  const [defaultQnt, setDefaultQnt] = useState(null);

  const  navigation = useNavigate()

  // Convert string quantity to number (e.g., "100g" -> 100, "1Kg" -> 1000)
  const convertToGrams = (valueer) => {
    // alert(value)
    const value = valueer.toString()
    if (value === "custom") return null;
    
    // Remove any spaces and convert to lowercase for consistent parsing
    const cleanValue = value.toLowerCase().replace(/\s+/g, '');
    
    // Extract the numeric part and unit
    const match = cleanValue.match(/^(\d+(?:\.\d+)?)(g|kg)?$/);
    if (!match) return null;
    
    const amount = parseFloat(match[1]);
    const unit = match[2] || 'g';
    
    // Convert to grams based on unit
    return unit === 'kg' ? Math.round(amount * 1000) : amount;
  };

  const deconvertToGrams = (value) => {
    if (value >= 1000) {
      return `${value/1000}Kg`;
    } else {
      return `${value}g`;
    }
  }

  const onQuantityChange = (e,id) => {

    const { value } = e.target;
    // alert(convertToGrams('10Kg'))
    
    if(value === 'custom'){
      return showPopup(true);
    }
    
    setQnt(value);
    const gramsValue = convertToGrams(value);
    
    if (gramsValue !== null) {
      updateCartITem({id,action:'update',seletor:convertToGrams(value)})
      setProductData((prevItems) =>
        prevItems.map((item, indexo) =>
          indexo === index ? { ...item, quantity: gramsValue } : item
        )
      );
    }
  };

  const handleCustomQuantity = (newValue) => {
    showPopup(false);
    if (newValue) {
      // Add to options and set as selected
      setOptions(prev => [...prev, newValue]);
      updateCartITem({id:data?.product?._id,action:'update',seletor:convertToGrams(newValue)})
      setQnt(newValue);
      const gramsValue = convertToGrams(newValue);
    
    if (gramsValue !== null) {
      setProductData((prevItems) =>
        prevItems.map((item, indexo) =>
          indexo === index ? { ...item, quantity: gramsValue } : item
        )
      );
    }
    }
  };

  useEffect(() => {
    if (data?.quantity&&!stp) {
      const formattedQnt = deconvertToGrams(data.quantity);
      setQnt(formattedQnt);
      setDefaultQnt(formattedQnt);
    }
    // alert(deconvertToGrams(data.quantity))
    const quantity = data.product.stock;
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
    
    if(!stp){
      
      setOptions(prevOptions => {
        return prevOptions.filter(option => {
          if (option === "custom") return true;
          const threshold = thresholds.find(t => t.option === option);
          return threshold ? threshold.value <= quantity : false;
        });
      });
      setStp(true)
    }
    if(!options.includes(deconvertToGrams(data?.quantity))){
      setOptions((prevData)=>[...prevData,deconvertToGrams(data?.quantity)])

    }
    
  }, [data])

  const removeItem = (productId)=>{
    setDPopup(true)
    // updateCartITem(productId)
    setDeleteData({id:productId})
    
    // setProductData((prevData)=>{
    //   console.log(prevData);
      
    //   return prevData.filter( data => data.product._id!==productId)  
    // })
  }
  
  useEffect(()=>{
    if(dataDelete){
      showToast(dataDelete,'success')
    }
  },[dataDelete])

  useEffect(() => {
    if (deleteData === data?.product?._id) {
      setDPopup(false)
      setProductData((prevData) =>
        prevData.filter((s) => s.product._id !== data?.product?._id)
    )
    setDeleteData()
    // showToast('hsflkj','success')
    }
  }, [deleteData, data?.product?._id])

  
  
  return (
    <> 
    {dPopup && (
        <DeletePopup
          updater={updateCartITem} 
          deleteData={deleteData} 
          setDeleteData={setDeleteData}
          showPopup={setDPopup} 
          isUser={true}
          isCart={true}
        />
      )}
    { popup &&
      <ProductQuantityPopup 
        stock={data?.product?.stock} 
        options={options} 
        setOptions={setOptions}
        onClose={handleCustomQuantity}
        onSelect={onQuantityChange}
        showPopup={showPopup}
      />
    }
    <div className="p-8 hover:scale-[1.1] duration-500 min-w-72 max-w-72 bg-[linear-gradient(27deg,#f6d3df90,#ffffff50)] rounded-[50px] relative overflow-hidden">
      <div className="w-full h-full flex items-center flex-col">
      <i onClick={()=>removeItem(data?.product?._id)} className="ri-close-line p-[2px] bg-[#00000040] rounded-full absolute left-8 top-8 px-[5px]"></i>
        <img className="w-[50%] h-[50%] object-cover" src={data?.product?.pics?.one} alt="" />
        <h1 className="text-[18px] font-bold">{data?.product?.name}</h1>
        <p className="text-green-700 mb-3">{data?.product?.category?.name}</p>
        {/* <div className=" h-8 w-[calc(100%_-_64px)] flex gap-3 mb-3 justify-center items-center">
            <div className="h-full w-12 border-gray-400 border-2 flex justify-center items-center rounded-l-full">
            <i className="ri-add-fill text-[20px] opacity-40"></i>
            </div>
            <div className="h-full w-12 border-gray-400 border-[2px]  flex justify-center items-center rounded-r-full">
            <i className="ri-subtract-line text-[20px] opacity-40"></i> 
            </div>
        </div> */}
        <p className="w-[calc(100%_-_64px)] text-center bg-[#00000010] font-bold py-[6px] my-2 mt-3 rounded-full">
          { defaultQnt &&
          <span>
            <select 
              onChange={(e)=>onQuantityChange(e,data?.product?._id)}
              value={qnt || ''}
              defaultValue={convertToGrams(data?.quantity)}
              className="outline-none bg-transparent rounded-full max-w-20"
            >
              {
                options.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))
              }
            </select>
          </span>
          }
        </p>
        <p onClick={() => navigation("/user/ordersummery", { state: { items: [{ product:data?.product,quantity:(qnt) }], qnt: qnt } })} className="w-[calc(100%_-_64px)] text-center py-[6px] bg-[#ffffff50] my-2 rounded-full">Buy now</p>
 
      </div>
    </div>
    </>
  );
}

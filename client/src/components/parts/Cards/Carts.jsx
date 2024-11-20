import React, { useEffect, useState } from "react";
import aplle from "../../../assets/images/aplle.png"
import ProductQuantityPopup from "../popups/ProductQuantityPopup";
import { useNavigate } from "react-router-dom";

export default function Carts({ data }) {

  const [options, setOptions] = useState(["100g", "250g", "500g", "1Kg", "2Kg", "5Kg", "10Kg", "25Kg", "50Kg", "75Kg", "100Kg", "custom"]);

  const [popup, showPopup] = useState(false);
  const [defaultQnt, setDefaultQnt] = useState(null);

  const  navigation = useNavigate()

  // function convertToGrams(value) {
  //   // Check if the value is "custom"
  //   if (value === "custom") {
  //       console.error("Custom input detected. Please handle this case separately.");
  //       return null;
  //   }

  //   // Extract the numeric part and the unit (g or kg)
  //   const match = value.match(/^(\d+)(g|Kg)$/);
  //   if (!match) {
  //       console.error("Invalid value format. Expected formats: '100g', '1kg', etc.");
  //       return null;
  //   }

  //   const amount = parseInt(match[1], 10); // Numeric part
  //   const unit = match[2]; // Unit

  //   // Convert to grams
  //   return unit === "Kg" ? amount * 1000 : amount;
  // }

  function deconvertToGrams(value) {
    if (value >= 1000) {
      return `${value/1000}Kg`;
    } else {
      return `${value}g`;
    }
  }

  
  useEffect(() => {
    console.log(deconvertToGrams(data?.quantity));
    
    setDefaultQnt(deconvertToGrams(data?.quantity));
    if (data?.product?.stock) {
      const quantity = data.product.stock;
      const thresholds = [
        { value: 100, option: "100g" },
        { value: 250, option: "250g" },
        { value: 500, option: "500g" },
        { value: 1000, option: "1kg" },
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
          const threshold = thresholds.find(t => t.option === option);
          return threshold ? quantity >= threshold.value : true;
        });
      });
    }
  }, [data])
  
  return (
    <> 
    { popup &&
      <ProductQuantityPopup stock={data?.product?.stock} options={setOptions} showPopup={showPopup} />
    }
    <div className="p-8 hover:scale-[1.1] duration-500 min-w-72 max-w-72 bg-[linear-gradient(27deg,#f6d3df90,#ffffff50)] rounded-[50px] relative overflow-hidden">
      <div className="w-full h-full flex items-center flex-col">
      <i className="ri-close-line p-[2px] bg-[#00000040] rounded-full absolute left-8 top-8 px-[5px]"></i>
        <img className="w-[50%] h-[50%]" src={data?.product?.pics?.one} alt="" />
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
            <select defaultValue={defaultQnt} className="outline-none bg-transparent ">
              {
                options.map((opt, idx) => {
                  return <option key={idx} value={opt}>{opt}</option>
                })
              }
                {/* <option value="500gm">500gm</option>
                <option value="1 kg">1Kg</option>
                <option value="2 kg">2 kg</option>
                <option value="3 kg">3 kg</option> */}
            </select>

          }
        </p>
        <p onClick={() => navigation("/user/ordersummery", { state: { items: [{ ...data?.product }], qnt: data?.quantity } })} className="w-[calc(100%_-_64px)] text-center py-[6px] bg-[#ffffff50] my-2 rounded-full">Buy now</p>
 
      </div>
    </div>
    </>
  );
}

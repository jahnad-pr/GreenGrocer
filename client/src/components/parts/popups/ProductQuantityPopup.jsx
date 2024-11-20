import React, { useEffect, useState } from 'react';

const ProductQuantityPopup = ({ showPopup, options, stock }) => {
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('kg');
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };



  const handleSubmit = () => {
    if(unit ==='kg'){
      if(quantity > stock/100){
        setError('Quantity must be less than or equal to stock')
    } else{
      options((prev)=>([...prev,`${stock/100} Kg`]))
    }
  }
  if(unit ==='gram'){
    if(quantity > stock){
      setError('Quantity must be less than or equal to stock')
  }else{
    options((prev)=>([...prev,`${stock} gram`]))
  }
}
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 backdrop-blur-md bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-black text-white rounded-[35px] shadow-2xl py-8 px-8 text-left overflow-hidden pb-10 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-300" id="modal-title">Enter Product Quantity</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Please enter the quantity and select the unit.</p>
                { error && <p className='text-red-500'>{error}</p> }
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 space-y-4">
            <div className="flex items-center gap-4 justify-center">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="px-3 py-2 bg-[#ffffff30] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4 justify-center">
              <label htmlFor="unit" className="text-sm font-medium">
                SElect the Unit:
              </label>
              <select
                id="unit"
                value={unit}
                onChange={handleUnitChange}
                className=" py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-full bg-[#ffffff30] px-10 custom-selecto"
              >
                <option className='text-black' value="kg">kg &nbsp;(Kilo Gram)</option>
                <option className='text-black' value="gram">gram &nbsp;</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-3 bg-[linear-gradient(to_left,#392ab8,#711978)] text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
              onClick={handleSubmit}
            >
              Continue
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center rounded-full border-2 border-gray-500 shadow-sm px-4 py-2 text-base font-medium text-gray-200 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={()=>showPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuantityPopup;
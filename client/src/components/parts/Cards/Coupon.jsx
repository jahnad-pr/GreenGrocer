import { Copy } from "lucide-react";
import React from "react";



export function Coupon({ index, coupon, setCode }) {


  return <div key={index} className={`min-w-60`}>

    <div className="h-full flex flex-col items-center relative">

      <span className="rounded-[30px] w-full rounded-br-[120px] bg-red-300 p-6 pt-10 group">

      { /* Coupon Icon */ }
      <div className="mb-4">
        <div 
          onClick={() => {
            navigator.clipboard.writeText(coupon.code);
            setCode(coupon.code)
          }}
          className="inline-flex items-center group-hover:scale-150 duration-300 justify-center bg-[#ffffff50] mb-8 p-2 rounded-lg absolute left-4 top-4 cursor-pointer"
        >
          <Copy size={80} className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      { /* Coupon Title */ }
      <h3 className="text-2xl font-semibold mb-2">{coupon.title}</h3>

      { /* Coupon Code */ }
      <div className={`text-lg ${coupon.theme === 'green' ? 'text-orange-500' : 'text-blue-500'} font-bold mb-2 `}>
        {coupon.code}
        <br />
      </div>

      { /* Description */ }
      <p className="text-gray-700 text-sm mb-4 font-medium">
        Get flat <span className={coupon.theme === 'green' ? 'text-red-500' : 'text-blue-500'}>
          {coupon.discountType==='percentage' ? coupon.discountAmount+'%' : coupon.discountAmount+'₹'}
          <br />
        </span> {coupon.description}
      </p>

      </span>

      { /* Image */ }
      <div className="mt-auto">
        <img src={coupon.image} alt={coupon.title} className="w-30 h-30 rounded-lg absolute bottom-0 left-0 bg-green-500" />
      </div>


    </div>
  </div>
}

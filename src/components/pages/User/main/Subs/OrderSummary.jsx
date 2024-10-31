import React from "react";
import past from '../../../../../assets/images/fast.png'
import normal from '../../../../../assets/images/normal.png'
import eco from '../../../../../assets/images/rco.png'


export default function OrderSummary() {
  return (
    <div className="w-[96% h-full bg-gray-100]">
      <div className="w-full h-full px-40 py-10 flex gap-20 relative">
        <span>
          {/* Head */}
          <h1 className="text-[30px] font-bold my-8">Order Summary</h1>

          {/* order address */}
          <p className="text-[20px] opacity-40 font-medium">
            Choose The Address to Deliver the Products
          </p>

          {/* address seelcter */}
          <div className="mt-4">
            <div className="mt-2">
              <select className="px-5 min-w-[700px] p-2 border rounded custom-select">
                <option className="text-[15px]">
                  Near Salu Statue, Salu Nagar H(333), Pothukallu, Nilambur,
                  MALAPPURAM, KERALA
                </option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[20px] opacity-40 font-medium">
              Enter Your Mobile Number to get updates
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <span className="bg-[#f5efef] rounded-full p-3">+91</span>
              <input
                type="text"
                className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                placeholder="9078454323"
              />
            </div>
          </div>

          {/* cart items and stats */}
          <div className="mt-8 w-full space-x-8 bg-[linear-gradient(#f4e7e7,#e3f1e4)] rounded-[30px]">
            <div className=" px-10 py-10">
              <h3 className="text-lg font-bold">
                Items in Cart and Their Pricing
              </h3>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://placehold.co/32x32"
                      alt="Gala Apple"
                      className="w-8 h-8"
                    />
                    <span>Gala Apple</span>
                    <span className="text-gray-500">1 kilogram</span>
                  </div>
                  <span className="text-green-600 font-bold">₹291</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://placehold.co/32x32"
                      alt="Cabbage"
                      className="w-8 h-8"
                    />
                    <span>Cabbage</span>
                    <span className="text-gray-500">1 kilogram</span>
                  </div>
                  <span className="text-green-600 font-bold">₹66</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://placehold.co/32x32"
                      alt="Gooseberry"
                      className="w-8 h-8"
                    />
                    <span>Gooseberry</span>
                    <span className="text-gray-500">1 kilogram</span>
                  </div>
                  <span className="text-green-600 font-bold">₹392</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://placehold.co/32x32"
                      alt="Thompson Grapes"
                      className="w-8 h-8"
                    />
                    <span>Thompson Grapes</span>
                    <span className="text-gray-500">1 kilogram</span>
                  </div>
                  <span className="text-green-600 font-bold">₹56</span>
                </div>
              </div>

              {/* sub amound stats */}
              <div className="mt-4 bg-[#ffffff60] p-4 rounded-[20px]">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="font-bold">₹805</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-bold">-₹31</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-bold">₹72.3</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold">₹40</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon</span>
                  <span className="font-bold">-₹50</span>
                </div>
                <div className="flex justify-between mt-4 text-xl font-bold">
                  <span>Grand Total</span>
                  <span className="text-green-600">867.3 ₹</span>
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
              <div className="w-1/3 p-5 text-center border rounded-[40px] shadow relative pt-8 bg-[radial-gradient(#d5dfff,white)]">
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
                <div className="absolute left-5 top-5 w-5 h-5 bg-[#24346952] rounded-full"></div>
              </div>
              {/* second */}
              <div className="w-1/3 p-5 text-center border rounded-[40px] shadow relative pt-8 bg-[radial-gradient(#fcffd1,white)]">
                <img
                  src={normal}
                  alt="Fast Delivery"
                  className="w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">Normal Delivery</h4>
                <p className="text-gray-500 text-sm">
                Offering safe and natural normal delivery services through our app – ensuring comfort, care, and expert support for every mother and baby
                </p>
                <div className="absolute left-5 top-5 w-5 h-5 bg-[#6f74305e] rounded-full"></div>
              </div>
              {/* third */}
              <div className="w-1/3 p-5 text-center border rounded-[40px] shadow relative pt-8 bg-[radial-gradient(#ceffde,white)]">
                <img
                  src={eco}
                  alt="Fast Delivery"
                  className="w-full object-cover rounded"
                />
                <h4 className="mt-2 font-bold">Eco Delivery</h4>
                <p className="text-gray-500 text-sm">
                Introducing Eco Delivery – a slower, eco-friendly delivery option that puts the safety of nature first, reducing carbon footprints with every order.inspired by Zelova
                </p>
                <div className="absolute left-5 top-5 w-5 h-5 bg-[#21834241] rounded-full"></div>
              </div>
              
            </div>
            <div className="mt-8">
              <h3 className="text-lg opacity-40 font-medium">Apply Coupon</h3>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full max-w-[450px] py-3 px-5 bg-[linear-gradient(45deg,#f5efef,#f5efef)] rounded-full text-[18px]"
                  value="Z076FXXX"
                />
                <button className="px-6 py-3 bg-[linear-gradient(#e7ecff,#dcffe7)] text-gray-500 rounded-full">
                  Applied
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
          <button className="px-16 absolute bottom-20 py-[15px] bg-[linear-gradient(to_left,#0bc175,#0f45ff)] text-[18px] rounded-full text-white font-medium mt-10 w-full max-w-[300px]">Continue</button>

          </div>
        </span>
      </div>
    </div>
  );
}

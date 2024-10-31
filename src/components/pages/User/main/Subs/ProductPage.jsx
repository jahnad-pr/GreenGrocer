import React from "react";
import banana from "../../../../../assets/images/banana.png";
import star from "../../../../../assets/images/star.png";

export default function ProductPage() {
  return (
    <div className="w-[96%] h-full relative">
      <div className="w-full h-full flex px-20">
        {/* product image nav------------------ */}
        <div className="flex-grow-[3] min-w-[30%] h-full bg-slate-400 items-center justify-center flex">
          <img className="w-[80%]" src={banana} alt="" />
        </div>

        {/* Product details------------ */}
        <div className="flex-grow-[4] h-full pt-12 pl-20">
          <div className="w-full h-full">
            {/* category */}
            <p className="text-[20px] font-medium opacity-45">FRUIT</p>
            {/* name */}
            <p className="text-[40px] font-bold">Banana Njalipovan</p>

            {/* stars and reviews */}
            <div className="inline-flex gap-5 items-center justify-center">
              <div className="flex">
                <img className="w-8 h-8" src={star} alt="" />
                <img className="w-8 h-8" src={star} alt="" />
                <img className="w-8 h-8" src={star} alt="" />
                <img className="w-8 h-8" src={star} alt="" />
                <img className="w-8 h-8 grayscale" src={star} alt="" />
              </div>
              {/* reviews count */}
              <p className=" translate-y-[4px] font-medium opacity-55">
                4.5 (123 reviews)
              </p>
            </div>
            {/* description */}
            <p className="min-h-16 opacity-45">The freshness of enargy</p>
            {/* Freshness sattus and time */}
            <p className="text-[20px] text-green-700 font-bold">FRESH</p>
            <p className="opacity-45">
              When the customer confirms their order, the material (wood from
              the tree) will be cut specifically for that order. This ensures
              that each piece is custom-prepared only after the order is
              finalized, minimizing waste and ensuring the wood is fresh and
              tailored to the customer's specifications
            </p>
            {/* Product from */}
            <p className="pt-5 text-[16px] font-medium">From</p>
            <p className="opacity-45">Shalu’s Farm Kochin,Kadavanthara</p>

            {/* offer banner */}
            <div className="pb-4 flex mt-5 max-w-[90%]">
              <div className="inline-flex items-center gap-10 bg-[#fdedb8] py-3 px-5 rounded-xl">
                <p className="text-[22px] font-bold text-orange-700">
                  Special offer :
                </p>
                <div className="flex gap-3 items-center justify-center">
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-red-100 border-[2px] border-red-400">
                    {" "}
                    08{" "}
                  </div>
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-red-100 border-[2px] border-red-400">
                    {" "}
                    08{" "}
                  </div>
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-red-100 border-[2px] border-red-400">
                    {" "}
                    08{" "}
                  </div>
                  <p>:</p>
                  <div className="w-12 h-12 grid place-items-center rounded-xl bg-red-100 border-[2px] border-red-400">
                    {" "}
                    08{" "}
                  </div>
                </div>
                <p className="text-[15px] opacity-45">
                  Remains until <br /> the end of the offer
                </p>
                <p className="text-[24px] font-bold text-yellow-600">
                  30% <span className="text-black"> off</span>
                </p>
              </div>
            </div>

            {/* our features */}
            <div className="border-[2px] text-[#9b9a9a] inline-flex flex-col max-w-[70%] rounded-xl">
              <div className="border-b-[2px] text-[#9b9a9a] inline-flex justify-normal items-center pr-8 py-2">
                <i className="ri-bank-card-2-line text-[30px] mx-5"></i>
                <p>
                  <span className="font-bold text-center">Payment.</span>{" "}
                  Payment upon receipt of goods, Payment by card in the
                  department, Google Pay, Online card, -5% discount in case of
                  payment
                </p>
              </div>
              <div className=" inline-flex justify-normal items-center pr-8 py-2">
                <i className="ri-secure-payment-line text-[30px] mx-5"></i>
                <p>
                  <span className="font-bold">quality.</span>The Consumer
                  Protection Act does not provide for the return of this product
                  of proper quality.
                </p>
              </div>
            </div>

            <p className="my-5 text-[20px] font-medium text-blue-400">
              Product Review
            </p>

            {/* Config of product */}
            <div className=" inline-flex gap-5 opacity-60">
              {/* Bookmarks */}
              <div className="inline-flex gap-3 items-center justify-center">
                <i className="ri-bookmark-line text-[20px] p-2 py-1 rounded-lg border-[2px] border-gray-600"></i>
                <p className="text-[18px]">Bookmark</p>
              </div>
              {/* Share */}
              <div className="inline-flex gap-3 items-center justify-center">
                <i className="ri-share-line text-[20px] p-2 py-1 rounded-lg border-[2px] border-gray-600"></i>
                <p className="text-[18px]">Bookmark</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* Config bar for buy and add to cartt---------- */}
        <div className="absolute w-[80%] h-28 bottom-10 left-1/2 translate-x-[-50%] bg-slate-300 flex items-center gap-8 px-10 rounded-2xl justify-center">
          {/* products image */}
          <img
            className="w-20 p-2 border-[2px] border-gray-500 rounded-[10px]"
            src={banana}
            alt=""
          />
          {/* title and count of cart */}
          <div className="">
            <p className="text-[18px] font-medium">Banana Njalipovan</p>
            <p className="text-blue-500 translate-y-[-5px]">
              3 More cart items
            </p>
          </div>

          {/* remaining stats */}
          <span className="leading-[25px] translate-y-[8px]">
            <p className="text-[32px] text-[#6C6C6C] font-bold font-serif calistoga-regular">
              100kg
            </p>
            <p className=" opacity-35">Remaining</p>
          </span>

          {/* quantity changer */}
          <div className="flex gap-5 items-center">
            <div className="border-[1px] border-black flex items-center justify-center rounded-[15px] opacity-40">
              <i className="ri-subtract-line flex-1 text-center text-[25px] border-r-[1px] border-black p-3 py-[0px]"></i>
              <i className="ri-add-line flex-1 text-center text-[28px] p-3 py-[0px]"></i>
            </div>
            <select
              className="text-[20px] text-[#6C6C6C] font-medium bg-transparent focus:outline-none cursor-pointer"
              defaultValue="100kg"
            >
              <option value="100g">100g</option>
              <option value="250g">250g</option>
              <option value="500g">500g</option>
              <option value="1kg">1kg</option>
              <option value="2kg">2kg</option>
              <option value="5kg">5kg</option>
              <option value="10kg">10kg</option>
              <option value="100kg">100kg</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {/* prices */}
          <div className="flex gap-3 mx-6">
            <s>
              <p className="lemon-regular text-[26px] opacity-45">78₹</p>
            </s>
            <p className="lemon-regular text-[38px] price">57 ₹</p>
          </div>

          {/* Buy now btn */}
          <span className="flex gap-2">
            <button className="flex px-5 py-2 gap-3 bg-black rounded-[10px] font-bold text-white justify-center items-center">
              <i className="ri-shopping-bag-line font-light text-[20px]"></i>
              <p>Buy now</p>
            </button>

            {/* add to cart btn */}
            <button className="flex px-5 py-2 gap-3 bg-green-700 rounded-[10px] font-bold text-white justify-center items-center">
              <i className="ri-shopping-cart-line font-light text-[20px]"></i>
              <p>Add to cart</p>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

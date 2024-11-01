import React from "react";
import aplle from "../../../assets/images/aplle.png";

export default function Bookmark({ col }) {
  return (
    <div className="h-80 min-w-60 max-w-60 bg-[linear-gradient(27deg,#f6d3df,#ffffff)] rounded-[50px] relative overflow-hidden">
      <div className="w-full h-full m-8">
        <img
          className={`w-4/3 absolute ${
            col
              ? "top-24 left-0 p-6"
              : "bottom-0 translate-x-[25%] right-0 translate-y-[25%]"
          }`}
          src={aplle}
          alt=""
        />
        <p className="text-[25px] font-bold mt-3">
          Summer
          <br />
          FRUIT
        </p>
        <p className="text-[20px] font-medium text-[#2b662c] mb-6">
          Fruit Collction
        </p>
        <div className="flex flex-col flex-0 self-start max-w-[60%] gap-3 text-white">
          <button
            className={`bg-[#8d45458e] px-6 py-1 rounded-3xl ${
              col ? "hidden" : "block"
            }`}
          >
            Add to cart
          </button>
          <button
            className={`bg-[#00000020] px-6 py-1 rounded-3xl text-black font-bold ${
              col ? "hidden" : "block"
            }`}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

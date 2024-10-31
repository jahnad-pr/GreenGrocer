import React from "react";
import MianList from "../../../parts/Main/MianList";

export default function Cart() {
  return (
    <div className="w-[96%] h-full bg-gray-100">
      <div className="w-full h-full bg-gray-200 px-40">
        <div className="w-full h-full bg-gray-300 pt-16 overflow-y-scroll relative">
          {/* Main head */}
          <h1 className="text-[30px] font-bold">Carts</h1>
          <p className="opacity-45 translate-y-[-9px]">2 totel items</p>


            {/* the list of bookmarks */}
            <div className="w-full h-full bg-gray-400 mt-4">
                <MianList type={"carts"}  />
            </div>

            <button className="absolute bottom-16 right-16 px-16 py-2 bg-[linear-gradient(to_left,#0bc175,#0f4586)] text-[20px] rounded-full text-white font-medium">Continue</button>

        </div>
      </div>
    </div>
  );
}

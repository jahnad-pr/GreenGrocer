import React from "react";
import greenGrocerLogo from "../../../../assets/Logos/main.png";
import siginImg from "../../../../assets/images/leftPlate.png";
import fru from "../../../../assets/images/fru.png";
import veg from "../../../../assets/images/veg.png";
import homi from "../../../../assets/images/homi.jpeg";
import List from "../../../parts/Main/List";

export default function Home() {
    return (
        <div className="flex-1 max-w-[94%]">
            <div className="w-full h-full overflow-x-hidden bg-[linear-gradient(to_bottom,#f5fafd,#ebf0f3,#d2d8da)]">

                {/* welcome message */}
                <div className="w-full h-full flex">
                    <div className="flex-1 justify-center flex flex-col px-40 gap-5">
                        <img className="w-[40%]" src={greenGrocerLogo} alt="" />
                        <p className="text-[20px] text-[#555721] opacity-50">Eat Fresh, Stay Healthy</p>
                        <h1 className="text-[70px] font-bold leading-none text-[#52AA57]">Fresh Fruits &<br /> <span className="text-[#3C6E51]">Veggies Delivered</span></h1>
                        <p className="pr-60 opacity-45">Enjoy fresh, healthy fruits and vegetables delivered straight to your door. Our selection is packed with nutrients to help you live healthier while making it easy to eat fresh every day. Start your wellness journey with the convenience of farm-to-table produce.
                        </p>
                        <div className="h-[2px] w-[70%] bg-[#CEBC81] mr-60" />
                        <button className="bg-[#3a8049] self-start px-8 py-3 flex gap-5 rounded-full text-white items-center shadow-2xl">
                            <i className="ri-shopping-cart-line text-[22px]"></i>
                            <p className="font-medium">Shop</p>
                        </button>
                    </div>
                    <div className="flex-1 rounded-l-full relative min-w-[50%]">
                        <img className="h-full w-full object-cover object-[-220px]" src={homi} alt="" />
                        {/* <div className="absolute top-0 w-[10%] h-full bg-[linear-gradient(to_right,white,transparent)]"></div> */}
                        {/* Adding a black overlay using ::after */}

                    </div>
                </div>

                {/* Banners */}
                <div className="w-full h-60 bg-gray-700"></div>


                {/* Fruit randoms collection/fruit */}
                <div className="w-full h-auto">
                    <List />
                </div>

                {/* Message of fruits with statistics */}
                <div className="w-full flex px-40 my-20 py-10">
                    <div className="w-[40%] grid place-items-center">
                        <img className="" src={fru} alt="" />
                    </div>
                    {/* Importance */}
                    <div className="gap-2 flex flex-col px-20">
                        <p className="text-[20px] opacity-45">Why fruits are healthy for us ?</p>
                        <h1 className="text-[30px] font-bold leading-tight">The Power of Fruits: <span className="text-[30px] font-bold text-[#52AA57]"><br />Nature’s Gift to Your Health</span></h1>
                        <p className="text-[20px] pr-64 opacity-45">Fruits are a powerhouse of essential vitamins, minerals, and antioxidants that contribute to a healthier and stronger body. They help in boosting your immune system, improving digestion, and reducing the risk of chronic diseases like heart disease and diabetes</p>
                    </div>
                    {/* statisticts */}
                    <div className=" grid w-20 grid-cols-2 min-w-[300px] text-center">
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#52AA57]">30%</p>
                            <p className="leading-none opacity-45">reduce the <br/> risk of heart</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#52AA57]">25%</p>
                            <p className="leading-none opacity-45">decrease the <br/> risk of stroke</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#52AA57]">70%</p>
                            <p className="leading-none opacity-45">people report <br/> higher energy</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#52AA57]">35%</p>
                            <p className="leading-none opacity-45">improve gut <br/> health</p>
                        </span>
                    </div>
                </div>


                {/* Veg randoms collection/Veg */}
                <div className="w-full h-auto">
                    <List />
                </div>


                 {/* Message of veg with statistics */}
                 <div className="w-full flex px-40 my-28 py-10">
                    <div className="w-[45%] grid place-items-center order-2 ml-16">
                        <img className="" src={veg} alt="" />
                    </div>
                    {/* Importance */}
                    <div className="gap-2 flex flex-col pl-32 order-3">
                        <p className="text-[20px] opacity-45">Why Vegetables are healthy for us ?</p>
                        <h1 className="text-[30px] font-bold leading-tight">The Power of Vegetables: <span className="text-[30px] font-bold text-[#3C6E51]"><br />A Key to Lasting Health</span></h1>
                        <p className="text-[20px] opacity-45">Vegetables are packed with essential nutrients that support overall health, including vitamins, minerals, and fiber. Whether eaten raw, cooked, or blended into meals, vegetables are crucial for maintaining a balanced and healthy diet</p>
                    </div>
                    {/* statisticts */}
                    <div className=" grid w-20 grid-cols-2 min-w-[300px] text-center order-1">
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#3C6E51]">30%</p>
                            <p className="leading-none opacity-45">reduce the <br/> risk of heart</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#3C6E51]">25%</p>
                            <p className="leading-none opacity-45">reduces the <br/> likelihood of stroke</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#3C6E51]">80%</p>
                            <p className="leading-none opacity-45">spinach <br/> can provide</p>
                        </span>
                        <span className=" place-items-center py-2">
                            <p className="text-[35px] font-bold text-[#3C6E51]">35%</p>
                            <p className="leading-none opacity-45">enhance <br/> digestive health</p>
                        </span>
                    </div>
                </div>


            </div>
        </div>
    );
}

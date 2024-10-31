import React from 'react';
import { ArrowLeft, Home, Video, ShoppingBag, Bookmark, ShoppingCart, User, Search, Copy } from 'lucide-react';
import sum from '../../../../assets/images/sum.png'

const CouponsList = () => {
  const coupons = [
    {
      title: 'ONAM SPECIAL',
      code: 'ZNEW30',
      description: 'for vegetables in first order',
      theme: 'green',
      image: '/api/placeholder/240/96'
    },
    {
      title: `SUMMER TIME`,
      code: 'JVXDW77',
      description: 'for High Water Content Fruits',
      theme: 'blue',
      image: sum
    }
  ];

  return (
    <div className="w-[96%] h-full p-4">

    <div className="w-full h-full px-40">

      {/* Main Content */}
      <main className="mt-8">

        <h1 className="text-[30px] font-bold my-16">Coupons</h1>


        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {coupons.map((coupon, index) => (
            <div key={index} className={`w-64 h-80 rounded-3xl overflow-hidden ${coupon.theme === 'green' ? 'bg-green-50' : 'bg-blue-50'}`}>
              <div className="p-6 h-full flex flex-col items-center relative">
                {/* Coupon Icon */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center bg-white p-2 rounded-lg absolute left-4 top-4">
                    <Copy className="w-3 h-3 text-gray-600" />
                  </div>
                </div>

                {/* Coupon Title */}
                <h3 className="text-2xl font-semibold mb-2">{coupon.title}</h3>

                {/* Coupon Code */}
                <div className={`text-lg ${coupon.theme === 'green' ? 'text-orange-500' : 'text-blue-500'} font-bold mb-2 `}>
                  {coupon.code}
                  <br />
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 text-center font-medium">
                  Get flat <span className={coupon.theme === 'green' ? 'text-red-500' : 'text-blue-500'}>
                    {coupon.theme === 'green' ? '20%' : '30%'}
                  </span> {coupon.description}
                </p>

                {/* Image */}
                <div className="mt-auto">
                  <img 
                    src={coupon.image} 
                    alt={coupon.title}
                    className="w-full rounded-lg absolute bottom-0 left-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>

    </div>
  );
};

export default CouponsList;

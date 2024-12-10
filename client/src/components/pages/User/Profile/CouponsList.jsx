import { Coupon } from './../../../parts/Cards/Coupon';
import React, { useEffect } from 'react';
import { ArrowLeft, Home, Video, ShoppingBag, Bookmark, ShoppingCart, User, Search, Copy } from 'lucide-react';
import sum from '../../../../assets/images/sum.png'
import { useGetAllCouponsMutation } from '../../../../services/User/userApi';

const CouponsList = () => {

  const [getAllCoupons,{data}] = useGetAllCouponsMutation()

  useEffect(()=>{ getAllCoupons() },[])

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
          {data?.map((coupon, index) => (
            coupon.isActive &&
            <Coupon   index={index} coupon={coupon}  />
          ))}
        </div>
      </main>
    </div>

    </div>
  );
};

export default CouponsList;

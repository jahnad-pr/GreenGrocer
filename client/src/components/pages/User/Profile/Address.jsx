import React, { useEffect, useState } from "react";
import home from "../../../../assets/images/Adress icons/home.png";
import work from "../../../../assets/images/Adress icons/bag.png";
import person from "../../../../assets/images/Adress icons/person.png";
import other from "../../../../assets/images/Adress icons/other.png";
import { useDeleteAddressMutation, useGetAdressesMutation } from "../../../../services/User/userApi";
import HoverKing from "../../../parts/buttons/HoverKing";
import { useLocation, useNavigate } from "react-router-dom";
import emptyStateImage from "../../../../assets/images/noCAtegory.png";
import DeletePopup from "../../../parts/popups/DeletePopup";
import { showToast } from "../../../parts/Toast/Tostify";


const EmptyState = () => (
  <div className="w-full h-[60vh] flex items-center justify-center flex-col text-center gap-5">
    <img className="h-[70%]" src={emptyStateImage} alt="No categories" />
    <div className="flex flex-col gap-2">
      <h1 className="text-[30px] font-bold">No Adress</h1>
      <p className="opacity-45">
        Lets add your address, to continue for buy our healthy product
      </p>
    </div>
  </div>
);


export default function Address({ userData }) {

  // mutation to update user
  const [getAdresses, { isLoading, error, data },] = useGetAdressesMutation();


  const [adressData, setaddressData] = useState()


  const navigate = useNavigate()
  const location = useLocation()

  // useEffect(() => {
  //   console.log('Location state:', location?.state);
  //   if(location?.state?.items && adressData?.length > 0){
  //     navigate('/user/ordersummery',{ state: location?.state })
  //   }
  // },[location,adressData]);

  // Custom content component for the toast



  useEffect(() => {
    if (location?.state) {
      console.log(location?.state);
      showToast(location?.state, 'success')
    }
  }, [location])

  // to show the error and success
  useEffect(() => {
    if (data) {
      setaddressData(data)
    }
  }, [data])
  useEffect(() => showToast(error?.data, 'error'), [error])
  getAdresses

  useEffect(() => { (async () => { if (userData) { await getAdresses(userData?._id) } })() }, [userData])

  return (userData &&
    <>
      {/* <ToastContainer title="Error" position="bottom-left" /> */}
      <div className="w-[96%] h-full">
        {/* <div className="bg-[#5a52319c] mix-blend-screen absolute w-full h-full"></div> */}
        <div className="w-full h-full flex flex-col items-center gap-5 backdrop-blur-3xl">
          <span className="w-full h-full px-64 bg-[#ffffff81] relative  overflow-scroll pb-96">

            <HoverKing event={() => navigate('/user/profile/:12/Manageaddress')} styles={'fixed bottom-28 right-64 rounded-full'} Icon={<i className="ri-apps-2-add-line text-[30px] "></i>} >Add Address</HoverKing>

            {/* Head */}
            <h1 className="text-[30px] font-bold my-16 mb-16">Manage Address</h1>

            {adressData?.length > 0 ?

              // {/* address container */}
              <div className="w-full flex flex-wrap gap-5">

                {
                  adressData?.map((address, index) => {

                    return <span key={index} >
                      <AdressCard setaddressData={setaddressData} showToast={showToast} addressData={adressData} home={home} work={work} person={person} other={other} address={address} navigate={navigate} />
                    </span>

                  })
                }

              </div> : <EmptyState />



            }



          </span>
        </div>
      </div>
    </>
  );
}

function AdressCard({ home, work, person, other, address, phone, navigate, showToast, addressData, setaddressData }) {

  const [deleteAddress, { data },] = useDeleteAddressMutation();
  const [popup, showPopup] = useState(false);


  useEffect(() => {
    if (data) {
      showToast(data, 'success')
      setaddressData(addressData.filter((item) => item._id !== address._id))
    }
  }, [data])


  return (
    <> {popup && (
      <DeletePopup
        updater={deleteAddress}
        deleteData={{ id: address._id }}
        showPopup={showPopup}
        action="Delete Address"
        isUser={true}
      />
    )}
      <div onClick={() => navigate('/user/profile/1233/Manageaddress', { state: address })}
        className="w-[330px] h-[310px] border-2 hover:scale-105 duration-500 border-[#a2c4aa5d]  pt-10 bg-[linear-gradient(45deg,#ffffff00,#ffffff90)] rounded-[30px] rounded-tl-[120px] flex flex-col p-10 py-4 gap-5 relative group">

        <span className="flex  items-center gap-3">
          <img className={`w-24 group-hover:scale-125 duration-500 absolute -left-5 -top-5 ${address.locationType === 'Work' ? 'p-1' : ''}`} src={address.locationType === 'Home' ? home : address.locationType === 'Work' ? work : address.locationType === 'Person' ? person : address.locationType === 'Other' ? other : ''} alt="" />
          <p className="text-[20px] font-bold mb-2 ml-14">{address.locationType}</p>
      
        </span>


        <span className="text-[17px] leading-none opacity-65">
          <p className="">{address.FirstName} {address.LastName}</p>
            <p>{address.exactAddress}</p>
            <p>{address.streetAddress}</p>
            <p className="font-medium text-nowrap">{address.city.toUpperCase()}, {address.state.toUpperCase()} {address.pincode}</p>
        </span>

        <span>
          <p className="font-medium text-[16px] text-[#2d6933]"><span>+91</span> {address?.phone}</p>
        </span>

        <span className="flex justify-end gap-5">
        <i className="ri-eye-line text-[30px] opacity-45"></i>

          {/* <span className="flex-1"></span> */}
          {/* <i className="ri-more-line text-[28px]"></i> */}
          <i onClick={(e) => { e.stopPropagation() && showPopup(true) }} className="ri-delete-bin-6-line text-[28px] hover:scale-125 duration-500 text-red-500"></i>
        </span>

      </div>
    </>
  );
}

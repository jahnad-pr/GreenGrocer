import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetUserMutation } from "../../../../services/userApi";


// ProtectedRoute component
const ProtectedRoute = ({ children,sign }) => {

    const [getUser, { isLoading, error, data }] = useGetUserMutation();
    const [isSign,setSign] = useState(false)

    const navigater = useNavigate()

    // navigate to verify page its not verified
    useEffect(()=>{
        if(data?.verified){     
            navigater('/user/home')
        }else{
            navigater('/user/sign',{ state:{user:data?.user} })
        }
    },[data])

    // api to get userdata
    useEffect(()=>{
        const getUserData = async()=>{ await getUser().unwrap() }
        getUserData()
    },[isSign])

   //navigate to signup if user not login

   return !sign&&error ?
            <Navigate to={'/auth/user/signup'}/>:
            isLoading?<div>Loading...</div>:
            !sign&&data ? children :
            data?.verified&&data&&sign?<Navigate to={'/user/home'}/>:
            error&&sign?
            React.cloneElement(children, { setSign }):null

//    if(positionHome){
//        return data ? children : error ? <Navigate to={'/auth/ussignuper/signup'}></Navigate>:isLoading?<div>Loading...</div>:""
//     }else{
//         return error&&!data ? 
        
//         : data ? <Navigate to={'/user/home'}></Navigate>:isLoading?<div>Loading...</div>:""      
//    }

};

export default ProtectedRoute;

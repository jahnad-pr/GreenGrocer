import React, { useEffect } from "react";
import { useGetAdminMutation } from "../../../../services/Admin/adminApi";
import { useLocation, useNavigate } from "react-router-dom";


// ProtectedRoute component
const AdminProtucter = ({ children }) => {

    // nav hook and rtk quary hook
    const [getAdmin, { isLoading, error, data }] = useGetAdminMutation()
    const navigate = useNavigate()
    const location = useLocation()

    // api call for cookies
    useEffect(()=>{ (async()=>{ await getAdmin().unwrap() })() },[])

    // if not login
    useEffect(()=>{ if(error){ navigate('/auth/admin/login') } },[error])
    
    // return the home page
    // if loged
    if(location.pathname==='/auth/admin/login'&&data){
        return navigate('/admin/home')
    }else{
        return children
    }

}



export default AdminProtucter;

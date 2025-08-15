/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { setLoginData, setToken } from '../../redux/Slices/authSlice';
import { getAllUsers } from '../../services/operations/profileAPI';

const PrivateRoute = ({children}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    if(token !== null)
        return children
    else if(localStorage.authToken !== null && localStorage.logindata !== null){

        const JSONData = JSON.parse(localStorage.logindata);
        dispatch(setLoginData(JSONData));
        dispatch(setToken(localStorage.authToken));
        dispatch(getAllUsers());
        return children
    }
        return <Navigate to="/login" />

}

export default PrivateRoute

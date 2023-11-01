import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {

    const isLoginSuccess = useSelector((store) => store.AuthReducer.isLoginSuccess)

    // redirect to signup if not authenticated
    if (!isLoginSuccess) {
        return <Navigate to="/signup"> </Navigate>
    }
    else {
        return children
    }
}
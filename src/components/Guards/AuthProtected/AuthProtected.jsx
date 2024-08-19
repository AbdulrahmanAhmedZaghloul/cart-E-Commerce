// import React from 'react'

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../../Context/UserContext"

export default function ProtectedRoute({ children }) {
    const { userLogin } = useContext(UserContext)
    return (
        <>
            {userLogin ? <Navigate to={'/'} /> : children}
        </>
    )
}

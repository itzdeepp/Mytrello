import { Box } from '@chakra-ui/react'
import React from 'react'
import { Routes, Route } from "react-router-dom"
import PrivateRoute from "../Components/PrivateRoutes"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import NotFound from './NotFound'

export default function AllRoutes() {
  return (
      <Routes>
        <Route path='/' element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
  )
}

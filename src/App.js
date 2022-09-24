import React from 'react'
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import PrivateRoute from './PrivateRouter'
import Form from "./Form"

const App = () => {
  return (
   <BrowserRouter>

    <Routes>
      <Route element={<PrivateRoute/>}>
        <Route path='/' element={<Form/>}/> 
       
      </Route>
     
     <Route path='/signup' element={<SignUp/>}/> 
     <Route path='/login' element={<SignIn/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
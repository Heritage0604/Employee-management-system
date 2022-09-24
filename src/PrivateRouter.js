import React,{useState,useEffect} from 'react'
import {Outlet,Navigate} from "react-router-dom"
import { auth,db } from './firebase'
import { signOut } from 'firebase/auth'
import { updateDoc,doc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = () => {
 const [user,setuser]=useState(null)
 const [loading,setloading]=useState(true)
 useEffect(()=>{
onAuthStateChanged(auth,user=>{
 setuser(user)
 setloading(false)
})
 },[])
 if(loading){
  return "loading"
 }
  return (
    
     
      user?
      <Outlet/> :<Navigate to="/login"/>
     
    


    
  )
}

export default PrivateRoute
import React,{useState,useEffect} from 'react'
import "./SignIn.css"
import { Avatar, Button } from '@mui/material'
import { BrowserRouter,Route,Router,Routes,Link } from 'react-router-dom'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import {auth,db} from "./firebase"
import {setDoc,doc,serverTimestamp,Timestamp,updateDoc,onSnapshot} from "firebase/firestore"
import {useNavigate } from 'react-router-dom'


const SignIn = () => {
 const[show,setshow]=useState(false)
 const [data,setdata]=useState({
  
  email:"",
  password:"",
  error:null,
  loading:false
 })
 const navigate=useNavigate()
  const{email,password,error,loading}=data
  // handle change in the name email and password
   const handlechange=(e)=>{
setdata({...data,[e.target.name]:e.target.value})
 }
 // handle visibility of password
 const handlepassword=()=>{
  setshow(!show)
  if(show){
    document.getElementById("password").type="password"
   
  }
  else{
  document.getElementById("password").type="text"
  }
 }

 // submit users
 const handlesubmit= async (e)=>{
e.preventDefault();
if( email && password){
 setdata({...data,error:null, loading:true})
try{
 const result =await signInWithEmailAndPassword(auth,email,password)
 

 setdata({ name:'',
  email:"",
  password:"",
  error:null,
  loading:false})
 navigate("/", { replace: true });
}catch(error){
 alert(error)
 setdata({...data,error:error.message,loading:false})
}
 
}
else{
 setdata({...data,error:"All fields are required"})
}

 }
  return (
    <div className='login'>
 
    <section>
      <form className='form' autoComplete='off' onSubmit={handlesubmit}>
       <h3>Login into your Account</h3>
      <div className="input-container">
   
       
       <label htmlFor="email" >Email</label>
       <input type="email" name='email' id='email' placeholder='email'value={email} onChange={handlechange} />
       <label htmlFor="password">Passowrd</label>
       <input type="password" name='password' id='password' placeholder='password'value={password} onChange={handlechange}  />
      </div>
      <div className="show">
       <Button onClick={handlepassword}>{show ? "Hide":"Show"}</Button>
      </div>
      <h3 className='error' style={{color:"red"}}>{error}</h3>
      <div className="btn-container">
       
       <Button className='btn' type={"submit"} style={{fontSize:"1.5rem"}} disabled={loading} >Sign in</Button>
       <p>Don't have an account? <Link to="/signup">Sign up</Link>  </p>
       </div>
     </form>
    </section>
    </div>
  )
}

export default SignIn
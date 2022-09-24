import React,{useState,useEffect} from 'react'
import "./SignIn.css"
import { Avatar, Button } from '@mui/material'
import { BrowserRouter,Route,Router,Routes,Link } from 'react-router-dom'
import {db,auth} from "./firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {setDoc,doc,serverTimestamp,Timestamp} from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
 const[show,setshow]=useState(false)
 const [data,setdata]=useState({
  name:'',
  email:"",
  password:"",
  error:null,
  loading:false
 })
 const navigate=useNavigate()
 // deconstruct the object(useState)
  const{name,email,password,error,loading}=data
  // handle state change
   const handlechange=(e)=>{
setdata({...data,[e.target.name]:e.target.value})
 }
 // handle password
  const handlepassword=()=>{
  setshow(!show)
  if(show){
    document.getElementById("password").type="password"
   
  }
  else{
  document.getElementById("password").type="text"
  }
 }
  const handlesubmit= async (e)=>{
e.preventDefault();
if(name && email && password){
 setdata({...data,error:null, loading:true})
try{
 const result =await createUserWithEmailAndPassword(auth,email,password)
 console.log(result.user)
 await setDoc(doc(db,"users",result.user.uid),{
  uid:result.user.uid,
  name,
  email,
  createdAt:Timestamp.fromDate(new Date),
  isOnline:true

 })
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
       <h3>Create an Account</h3>
      <div className="input-container">
       <label htmlFor="name">Name</label>
       <input type="text" name='name' id='name' placeholder='username' value={name} onChange={handlechange} />
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
       
       <Button className='btn' type={"submit"} style={{fontSize:"1.5rem"}} disabled={loading} >Register</Button>
       <p>Already have an account? <Link to="/login">Sign in</Link>  </p>
       </div>
     </form>
    </section>
    </div>
  )
}

export default SignUp
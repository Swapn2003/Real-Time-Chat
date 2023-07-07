import React from 'react'
// import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"


const Register = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const [pic, setPic] = useState();


  // const postDetails = (pics) => {}

  const submitHandler =async (e)=>{
    if(!name || !username || !email || !password){
      window.alert("Fill All Entries");
    }

    try{
      //first set the headers since we are sending json data
      const config ={
        headers:{
          "Content-type":"application/json",
        },
      };
      console.log("hello");
      const {data} =await axios.post("http://localhost:5000/api/user/",{name, email,username, password},config);
      try{localStorage.setItem("userInfo",JSON.stringify(data));}catch(error){
        console.log(error.message);
      }
      window.alert("Registration Successfull!");

    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div>
        <form className='register-form'>
                <label htmlFor="Name">Name</label>
                <input type="text" id="Name" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="Username">Username</label>
                <input type="text" id="username" placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="Email">Email</label>
                <input type="email" id="Email" placeholder="Enter Your Email Address" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="Password" >Password</label>
                <input type="password" id="Password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="pic" placeholder="Enter Pic">Pic</label>
                <input type="file" accept="image/*"  id ="Pic"/>
                <button type='button' onClick={submitHandler}>Register</button>
            </form>
    </div>
  )
}

export default Register

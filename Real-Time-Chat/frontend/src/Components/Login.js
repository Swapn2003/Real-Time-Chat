import React, { useState } from 'react'
// import {Link} from 'react-router-dom';
import axios from "axios"
const Login = (props) => {
  const [username, setUsername] = useState();
  // const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const fetchChats = async ()=>{
  //   const data = await axios.get("/api/chat")
  //   console.log(data.data);
  // }
  // useEffect(()=>{
  //   fetchChats();
  // },[])
  const submitHandler =async (e)=>{
    if(!username || !password){
      window.alert("Fill All Entries");
    }

    try{
      const config ={
        headers: {
          "Content-type":"application/json",
        }
      };
      const {data} = await axios.post("http://localhost:5000/api/user/login",{username,password},config);
      console.log(data);
      props.setmyId(username);
    //   localStorage.setItem("userInfo",JSON.stringify(data));
    }catch(error){
      console.log(error.message);
    }
  }
  return (
    <div>
            <form className='login-form'>
                <label htmlFor="Username">Username</label>
                <input type="text" id="username" placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="Password" >Password</label>
                <input type="password" id="Password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type='button' onClick={submitHandler}>Login</button>
            </form>
      
    </div>
  )
}

export default Login

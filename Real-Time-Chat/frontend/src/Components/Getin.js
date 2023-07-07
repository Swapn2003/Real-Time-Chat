import React from 'react'
// import { useRef } from 'react';
import Login from './Login';
import Register from './Register'
// import axios from 'axios';
import { useState } from 'react';

// import userContext from '../context/users/userContext';

const Getin = (props) => {
  // const idRef = useRef();
  // // const User =useContext(userContext);
  // const handleOnSubmit =(e)=>{
  //   e.preventDefault();
  //   props.setmyId(idRef.current.value);
  // }

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <div>
      {/* <div className="login-page">
        <div className="login">
            <form onSubmit={handleOnSubmit}>
              <div className="label">Enter your id</div>
              <input type="text" ref={idRef} required/>
                <button type='submit'>Login</button>
                <button >create new Id</button>

            </form>
        </div>
      </div> */}
        <div className="login-page">

            <div className="login-window">
              <h3>Con-ik</h3>
              <div className="buttons">
              <button className={`login-tab ${!activeTab?"active":""}`} onClick={() => handleTabClick(0)}>Login</button>
              <button className={`register-tab ${!activeTab?"":"active"}`} onClick={() => handleTabClick(1)}>Register</button>
              </div>
              
                  {activeTab === 0 &&
                      <Login setmyId={props.setmyId}/>
                    }
                  {activeTab === 1 &&
                      <Register/>
                    }
              
          </div>
      </div>
    </div>
  )
}

export default Getin;

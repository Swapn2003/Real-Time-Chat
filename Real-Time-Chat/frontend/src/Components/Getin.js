import React from 'react'
import Login from './Login';
import Register from './Register'
import { useState } from 'react';


const Getin = (props) => {


  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <div>
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

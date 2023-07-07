import React from 'react'

const Topbar = (props) => {
  const myId=props.myId;
  return (
    <div>
        <div className="topbar">
          <div className="logo_name">Con-ik</div>
          <button className="login-btn">{myId}</button>
        </div>
    </div>
  )
}

export default Topbar

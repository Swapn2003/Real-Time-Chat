import React from 'react'

const Topbar = (props) => {
  const myId=props.myId;
  const handleOnClick = ()=>{
    if(props.myId!=null)
    props.setmyId("");
    // console.log("logOut");
  }
  return (
    <div>
        <div className="topbar">
          <div className="logo_name">Con-ik</div>
          <button className="login-btn" onClick={handleOnClick}>LogOut</button>
        </div>
    </div>
  )
}

export default Topbar

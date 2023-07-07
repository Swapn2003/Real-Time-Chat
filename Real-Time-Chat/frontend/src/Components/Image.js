import React, { useEffect, useState } from 'react'
import userIcon from '../img/user.png';

const Image = (props) => {

  return (
    <div>
      <div className="chatfile">
        <img src={userIcon} alt="User" className='chatUserIcon'/>.
        <div className="message">
          <img style={{border: "5px  solid white",background:"rgba(255,255,255,0.5)",borderRadius:"6px", width:"40%",height:"auto"}} src={props.src} alt="sendImg" />
        </div>
      </div>
    </div>
  )
}

export default Image;

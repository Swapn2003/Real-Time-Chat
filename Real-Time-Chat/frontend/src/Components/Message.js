import React from 'react'
import userIcon from '../img/user.png';


const Message = (props) => {
  return (
    <div>
      <div className="chat">
        <img src={userIcon} alt="User" className='chatUserIcon'/>
        <div className="message">
            <div className="user-name">{props.name}</div>
            <hr />
            <p>{props.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Message

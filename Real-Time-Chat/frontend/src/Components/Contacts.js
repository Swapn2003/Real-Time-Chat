import React from "react";
import userContext from "../context/users/userContext";
import { useContext } from "react";
import userIcon from "../img/user.png"

const Contacts = (props)=>{
    const contactClass = document.getElementsByClassName(`${props.contactName}`);
    const User=useContext(userContext);
    const handleOnClick = async ()=>{
        await User.updateCurrentUser(props.contactName,props.recipients,props.isGroupChat);
        // console.log("Contacts::",props.contactName);

            // contactClass[0].style.background="white";
        
    }
    // console.log(props.Active);
    return (
        <div>
            <div>
                <div className="contacts" onClick={handleOnClick}>
                        <img src={userIcon} alt="User" className="contactUserIcon"/>
                        <div className="contactDesc">

                        <h5 className="contact-name" >{props.contactName}</h5>
                        <h5 className="contact-id" style={{color:"gray"}}>{props.recipients[0]}</h5>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts;
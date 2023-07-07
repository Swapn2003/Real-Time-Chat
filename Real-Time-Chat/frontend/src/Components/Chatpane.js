import React, { useState } from 'react'
import Chatbox from './Chatbox'
import Message from './Message'
import userIcon from '../img/user.png';
import moreIcon from '../img/More-icon.png'
// import { useState } from 'react';
import { useContext ,useEffect} from 'react';
import userContext from '../context/users/userContext';
import axios from 'axios';
import addMember from "../img/addMember.png";
import Image from './Image';

const Chatpane = (props) => {
  const User =  useContext(userContext);
  // // console.log(User.myContacts) ;
  // const chatpane = User.myContacts && User.myContacts.filter((contact) => contact.id === User.currentUser.id).map((contact) =>
  // contact.message.map((message, index) => (
  //   <div className={message.sender===props.myId?"outgoing-chats":"mychats"} key={index}>
  //       <Message name={message.sender===props.myId?"You":message.sender} text={message.text} />
  //     </div>
  //   ))
  // );

  // const [chatpane,setchatpane] =useState();

    // Perform any necessary actions when User.currentUser changes
    // For example, fetch new chat messages
      // if(!User.currentUser){
      //   return null;
      // }
      // const chatpane=null;
      // User.myContacts.filter((contact) => contact.id === User.currentUser.id).map((contact) =>
      // {console.log(contact.message);
        
        
      // });

      const handleOnClick=async()=>{
       const newMemberUsername = window.prompt('New Member username?');

       try{
        const config ={
          headers: {
            "Content-type":"application/json",
          }
        };
        axios.put(`http://localhost:5000/api/user/contacts/addMember`,{myId:props.myId,recipient:newMemberUsername,contactName:User.currentUser.contactName},config)
      }catch(error){
        console.log(error.message);
      }
      }


      if (!User.myContacts || !User.currentUser) {
        return null; // Or return a loading indicator
      }
      const chatpane=User.myContacts.filter((contact) => contact.contactName === User.currentUser.contactName).map((contact) =>
      { if(contact.messages!==undefined){if(contact.messages.length!==0){
      // console.log("contact.message:: ",contact.messages);
        return contact.messages.map((message, index) => (
          message.type === "file" ? (
            <div
              className={message.sender === props.myId ? "outgoing-chats" : "mychats"}
              key={index}
            >
              {/* <Image
                fileName={message.fileName}
                blob={new Blob([message.body],{type:"png"})}
              /> */}
              <Image src={message.locn} />
            </div>
          ) : (
            <div
              className={message.sender === props.myId ? "outgoing-chats" : "mychats"}
              key={index}
            >
              <Message
                name={message.sender === props.myId ? "You" : message.sender}
                text={message.content}
              />
            </div>
          )
      ))}}
    }
    );
  


  
  

  // const chatpane = User.myContacts
  //   .filter((contact) => contact.id === User.currentUser.id)
  //   .map((contact) =>
  //     contact.messages.map((message, index) => (
  //       <div className={message.sender === props.myId ? "outgoing-chats" : "mychats"} key={index}>
  //         <Message name={message.sender === props.myId ? "You" : message.sender} text={message.text} />
  //       </div>
  //     ))
  //   );
        
  return (

      <div className="chat-pane">
        <div className="chat-topbar">
          <img className="userIcon"src={userIcon} alt="User" />
          <span className="Group-name">{User.currentUser.contactName}</span>
          <div className="topbar-buttons" >
            <div className='addmember' onClick={handleOnClick} style={User.currentUser.isGroupChat?{}:{display:'none'}}><img src={addMember} alt="AddMember" /></div>
            <img className="moreIcon"src={moreIcon} alt="More" />
          </div>
        </div>
        <div className="chats">
          {/* <Message name="User"text="lorem njkdj kc kcejdwskdk j n kcxjnekjbjxj edj dbn xjd jdnb dn ndjnj djn kdx kjks jnsk hjsk jnsk js kshj nksnn."/> */}
          <div >

            
              {/* {User.myContacts!==undefined && User.currentUser!==undefined ?chatpane:null} */}
              {User.myContacts!==undefined && User.currentUser!==undefined ?chatpane:null}
{

              // User.Message.map((message,index)=>
              // {
              //   return(
              //    <div className="mychat" key={index}>
              //     {/* {console.log(message.text)} */}
              //      <Message name ={props.myId} text={message.text} />
              //    </div> );
              // }
              // )
}
            
          </div>
        </div>
        <div className="bottom-bar">
          <Chatbox myId={props.myId} />
        </div>
      </div>
  
  )
}

export default Chatpane

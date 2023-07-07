import React, { useContext, useEffect, useState } from 'react'
import Contacts from './Contacts'
import Addgroup from './Addgroup'
import userContext from '../context/users/userContext'
import axios from 'axios'
const Leftpane = (props) => {
  
  const User = useContext(userContext);

  useEffect(() => {
    const fetchContactList = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/contacts/accesscontacts?myId=${props.myId}`);
        const myContactList = response.data; // Assuming contact list is directly returned in response.data
        // console.log("hello");
        const mappedContacts = myContactList.map((contact) => {
          return {
            contactName: contact.contactName,
            recipients: contact.recipients,
            messages: contact.messages,
            isGroupChat:contact.isGroupChat
          };
        });
        await User.updatemyContacts(mappedContacts);
        // console.log("User.mycontacts",User.myContacts);
        // Update User context or state with the contact list
      } catch (error) {
        console.log(error.message);
      }
    };
    
    fetchContactList();
  }, [props.myId,User]);
  if(User.myContacts===undefined){
    return null;
  }
  return (
  
      <div className="leftpane">
        <div className="head_con">
        <h4>Contacts</h4>
        </div>
        <div className="contact-list">
          {User.myContacts.map((contact)=>{
            return(
              <Contacts contactName={contact.contactName} recipients={contact.recipients} isGroupChat={contact.isGroupChat} key={contact.contactName}/> //thoda check kar lena [0]
            )
          })}
        </div>

        <Addgroup myId={props.myId}/>

      </div>
   
  )
}

export default Leftpane

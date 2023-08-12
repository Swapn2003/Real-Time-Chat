import { useEffect, useState } from "react";
import userContext from "./userContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const UserState =(props)=>{

    const [currentUser,setcurrentUser] = useState();

    const updateCurrentUser = (contactName,recipients,isGroupChat) => {
        setcurrentUser({
          "contactName":contactName,
          "recipients":recipients,
          "isGroupChat":isGroupChat
        });
      };
      

      const [myContacts,setmyContacts] =useLocalStorage('ic');

        const updatemyContacts = (newContact) => {
          setmyContacts(newContact);
        };
   
    
    const addMessageToContact = (newMessage) => {
      const updatedContacts = myContacts.map((contact) => {
        if (contact.id === newMessage.id[0]) {
          return {
            name: contact.name,
            id: contact.id,
            message: [...contact.message, {'text':newMessage.text,'sender':newMessage.sender}],
          };
        }
        return contact;
      });
      console.log("Updated contacts:", updatedContacts);
      setmyContacts(updatedContacts);
    };
    return(
        <userContext.Provider value={{myContacts,updatemyContacts,currentUser,updateCurrentUser,addMessageToContact}}>
            {props.children}
        </userContext.Provider>
    )
}
export default UserState ;
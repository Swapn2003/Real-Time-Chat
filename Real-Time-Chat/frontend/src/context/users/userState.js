import { useEffect, useState } from "react";
import userContext from "./userContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const UserState =(props)=>{
    // const [currentUser,setcurrentUser] = useState({
    //     "username":"User2",
    //     "id":'2'
    // })
    const [currentUser,setcurrentUser] = useState();

    const updateCurrentUser = (contactName,recipients,isGroupChat) => {
        setcurrentUser({
          "contactName":contactName,
          "recipients":recipients,
          "isGroupChat":isGroupChat
        });
      };
      
    // const [Message,setMessage] = useState([])
    // const updateMessage = (newMessage) => {
    //     setMessage((prevMessage) => [
    //       ...prevMessage,
    //       {
    //         text: newMessage,
    //       },
    //     ]);
    //   };
      const [myContacts,setmyContacts] =useLocalStorage('ic');
      //   useEffect(() => {
      //     myContacts.forEach((contact) => {
      //       if (contact.id !== currentUser.id) return;
      //       setMessage((prevMessage) => [...prevMessage, ...contact.message]);
      //     });
      //     // console.log(myContacts);
      // }, [myContacts, currentUser.id]);
      
      // const [myId,setmyId] = useLocalStorage('id');
      // const updatemyId =(newId)=>{
        //     setmyId(newId);
        // }
        const updatemyContacts = (newContact) => {
          setmyContacts(newContact);
        };
        // const updatemyContacts = (newContact) => {
        //   setmyContacts((prevContacts) => [
        //     ...prevContacts,
        //     {
        //       contactName: newContact.contactName,
        //       username: newContact.username,
        //       message: [],
        //     },
        //   ]);
        // };
        // useEffect(console.log(`myContacts:: ${myContacts[0].message}`),myContacts)
        
    //     const addMessageToContact = (newMessage) => {
    //       console.log(newMessage);
    //       setmyContacts(
    //       myContacts.map((contact) => {
    //         if (contact.id === newMessage.id[0]) {
    //           return {
    //             'name': contact.name,
    //             'id': contact.id,
    //             'message': [...(contact.message), newMessage.text],
    //           };
    //         }
    //         return contact;
    //       })
    //       );
    // };

    // const addMessageToContact = (newMessage) => {
    //   setmyContacts((prevContacts) =>
    //     prevContacts.map((contact) => {
    //       if (contact.id === newMessage.id[0]) {
    //         return {
    //           name: contact.name,
    //           id: contact.id,
    //           message: [...contact.message, newMessage.text],
    //         };
    //       }
    //       return contact; // Return the contact as it is if the ID doesn't match
    //     })
    //   );
    // };
    
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
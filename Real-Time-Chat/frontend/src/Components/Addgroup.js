import React, { useContext } from 'react'
import userContext from '../context/users/userContext';
import axios from 'axios';
import addContact from "../img/addContact.png"
import createGrp from "../img/createGrp.png"

const Addgroup = (props) => {
  const User = useContext(userContext);

  const handleOnClick =async()=>{
    const groupName = window.prompt('Enter group name:');
    const groupId = window.prompt('Enter group ID:');

    if(!groupId || !groupName){
      window.alert("Fill All Entries");
    }

    try{
      const config ={
        headers: {
          "Content-type":"application/json",
        }
      };
      const {data} = await axios.put("http://localhost:5000/api/user/contacts/addContact",{"myId":props.myId,recipients:[groupId,props.myId],contactName:groupName,isGroupChat:false},config);
      // console.log(data);

      const contacts =await axios.get(`http://localhost:5000/api/user/contacts/accessContacts?myId=${props.myId}`);
      await User.updatemyContacts(contacts.data);
      console.log("addgroup::",contacts.data);
    }catch(error){
      console.log(error.message);
    }
    // if (groupName && groupId) {
    //   const groupData = { name: groupName, id: groupId };
    //   User.updatemyContacts(groupData);
    // }
  }
  const handleOnClick2 =async()=>{
    const groupName = window.prompt('Enter group name:');
    const groupId = window.prompt('Enter group ID:');

    if(!groupId || !groupName){
      window.alert("Fill All Entries");
    }

    try{
      const config ={
        headers: {
          "Content-type":"application/json",
        }
      };
      const {data} = await axios.put("http://localhost:5000/api/user/contacts/addContact",{"myId":props.myId,recipients:[groupId,props.myId],contactName:groupName,isGroupChat:true},config);
      // console.log(data);

      const contacts =await axios.get(`http://localhost:5000/api/user/contacts/accessContacts?myId=${props.myId}`);
      await User.updatemyContacts(contacts.data);
      console.log("addgroup::",contacts.data);
    }catch(error){
      console.log(error.message);
    }
    // if (groupName && groupId) {
    //   const groupData = { name: groupName, id: groupId };
    //   User.updatemyContacts(groupData);
    // }
  }
  return (
    <div>

            <div className="add-buttons">
              <button className='create-group' onClick={handleOnClick2}><img src={createGrp} alt="createGroup" /></button>
              <button className="add-contact" onClick={handleOnClick}><img src={addContact} alt="contactAdd" /></button>
              <div className="plus">+</div>
            </div>

    </div>
  )
}

export default Addgroup

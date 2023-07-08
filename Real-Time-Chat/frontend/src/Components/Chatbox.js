import React, { useState } from 'react';
import sendIcon from '../img/send.png';
import { useContext , useEffect} from 'react';
// import userContext from '../context/message/userContext';
import userContext from "../context/users/userContext";
import { useSocket } from '../context/SocketProvider';
import axios from 'axios';
import  EmojiInput  from 'react-input-emoji';
import convertToBase64 from '../helper/convert';
import addFileIcon from '../img/addFile-icon.png'

const Chatbox = (props) => {
  // const message = useContext(currentMessageContext);
  const User=useContext(userContext);
  const socket = useSocket();
  const [messageTyped,setmessageTyped]=useState("");
  const [file,setFile] = useState();
  const [locn,setlocn]= useState();
  const [pic,setpic]= useState();
  


  // useEffect(()=>{
  //   setlocn(convertToBase64(file));
  // },[file])
  const selectFile = async (e) => {
    const selectedFile = e.target.files[0];
    setmessageTyped(selectedFile.name);
    setFile(selectedFile);
  
    const base64String = await convertToBase64(selectedFile);
    setlocn(base64String);

    
      return;
    


  };
  // const selectFile =async(e)=>{
  //   setmessageTyped(e.target.files[0].name);
  //   setFile(e.target.files[0]);
  // }

  const handleOnChange=(event)=>{
    setmessageTyped(event);
  }
  const [recipients,setrecipients] =useState([User.currentUser.recipients]);
  useEffect(()=>{
    setrecipients([User.currentUser.recipients]);
  },[User.currentUser.id])
  // console.log(User.currentUser.id); // Log the updated value of recipients
  const myId=props.myId;
  useEffect(() => {
    if (socket) {
      socket.on('receive-message', async({ recipients, sender, text ,contactName,isGroupChat,type,locn}) => {
        console.log('receive-message',text,sender,recipients,contactName,isGroupChat,type,locn);
        if(type==='file'){
          try{
            const config ={
              headers: {
                "Content-type":"application/json",
              }
            };
            if(!isGroupChat){
              
              var response =await axios.get(`http://localhost:5000/api/user/contacts/getName?myId=${props.myId}&senderId=${sender}`)
            }
            
            // const formData = new FormData();
            // formData.append('myId', props.myId);
            // formData.append('contactName', `${isGroupChat?contactName:response.data}`);
            // formData.append('message_sender',sender);
            // formData.append('message_content',text);
            // formData.append('body',file);
            // await axios.put("http://localhost:5000/api/user/message/addFile",formData,config);

            const pws=await axios.put("http://localhost:5000/api/user/message/addMessage",{myId:props.myId,contactName:`${isGroupChat?contactName:response.data}`,message:{"sender":sender,"content":text,"type":'file',locn:locn}},config).then(()=>{
              setmessageTyped("");
              setFile();
    
            }).catch((err)=>{
              console.log(err);
            })

            
          }catch(error){
            console.log(error.message);
          }


        }else{

          try{
            const config ={
              headers: {
                "Content-type":"application/json",
              }
            };
            console.log("isgroupchat::",isGroupChat)
            
            if(!isGroupChat){
              
              var response =await axios.get(`http://localhost:5000/api/user/contacts/getName?myId=${props.myId}&senderId=${sender}`)
            }
            
            
            
            const pws=await axios.put("http://localhost:5000/api/user/message/addMessage",{myId:props.myId,contactName:`${isGroupChat?contactName:response.data}`,message:{"sender":sender,"content":text,"type":type,locn:locn}},config).then(()=>{
              setmessageTyped("");

    
            }).catch((err)=>{
              console.log(err);
            })
            // console.log("helloworld");
            // props.setmyId(username);
            //   localStorage.setItem("userInfo",JSON.stringify(data));
          }catch(error){
            console.log(error.message);
          }
        }
        // User.addMessageToContact({'text':text,id:[sender],'sender':sender});
      });
      
      return () => {
        socket.off('receive-message');
      };
    }
  }, [User,socket]);
  const onSendingMessage = async (event) => {
    event.preventDefault();
    // await User.updateMessage(messageTyped);
    
    if(file){
      // console.log('file',file,108);
      // console.log('base64',locn,109);
      
      
      try{
        
        if (file === undefined) {
          console.log("input an image",34)
          return;
        }else{
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "chat-app");
          data.append("cloud_name", "dntch5frn");
          fetch("https://api.cloudinary.com/v1_1/dntch5frn/image/upload", {
            method: "post",
            body: data,
          })
          .then((res) => res.json())
          .then((data) => {
            setpic(data.url.toString());
            console.log(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
        } 
        const messageObject={ 
          recipients, 
          text: messageTyped,
          contactName:User.currentUser.contactName,
          isGroupChat:User.currentUser.isGroupChat,
          type:"file",
          // body:file,
          mimeType:file.type,
          fileName:file.name,
          locn:pic,
        
        }

        
        // const config ={
        //   headers: {
        //     "Content-type":"multipart/form-data",
        //   }
        // };
        await socket.emit("send-message", messageObject);
        // const formData = new FormData();
        // formData.append('myId', props.myId);
        // formData.append('contactName', User.currentUser.contactName);
        // formData.append('message_sender',myId);
        // formData.append('message_content',messageTyped);
        // formData.append('body',file);
        // await axios.put("http://localhost:5000/api/user/message/addFile",formData,config);

        const config ={
          headers: {
            "Content-type":"application/json",
          }
        };
        // await socket.emit("send-message", { recipients, text: messageTyped,contactName:User.currentUser.contactName,isGroupChat:User.currentUser.isGroupChat,type:"text",body:""});
        // await User.addMessageToContact({text:messageTyped,id:recipients,'sender':props.myId});
        await axios.put("http://localhost:5000/api/user/message/addMessage",{myId:props.myId,contactName:User.currentUser.contactName,message:{"sender":myId,"content":messageTyped,type:"file",locn:pic}},config).then(()=>{
          setmessageTyped("");
          setFile();
          setpic();

        }).catch((err)=>{
          console.log(err);
        })


        
      }catch(error){
        console.log(error.message);
      }

    }else{

      try{
        const config ={
          headers: {
            "Content-type":"application/json",
          }
        };
        await socket.emit("send-message", { recipients, text: messageTyped,contactName:User.currentUser.contactName,isGroupChat:User.currentUser.isGroupChat,type:"text",locn:pic});
        // await User.addMessageToContact({text:messageTyped,id:recipients,'sender':props.myId});
        await axios.put("http://localhost:5000/api/user/message/addMessage",{myId:props.myId,contactName:User.currentUser.contactName,message:{"sender":myId,"content":messageTyped,type:"text",locn:pic}},config).then(()=>{
          setmessageTyped("");

        }).catch((err)=>{
          console.log(err);
        })
        // console.log(response);
        // props.setmyId(username);
        //   localStorage.setItem("userInfo",JSON.stringify(data));
      }catch(error){
        console.log(error.message);
      }
      console.log("see here chatbox::",User.currentUser)
      
      // console.log("Hello"); // Log the updated value of recipients
      // event.preventDefault();
    }
      
    };
    
    
    // useEffect(() => {
      //   if(User.Message.length>1){
  //     console.log(User.Message);
  //   }
  // }, [User.Message]);
  return (
    <div>
      
        <form className="chatbox" >
          {/* <input type="text" placeholder='Type here' value={messageTyped} onChange={handleOnChange}/> */}
          <label htmlFor="file" className="file-icon"><img src={addFileIcon} alt='addFile' />
          <input type="file" id="file" onChange={selectFile} style={{ display: 'none' }}/>
          </label>
          <EmojiInput
          value={messageTyped}
          onChange={handleOnChange}
          placeholder="Type here"
          className="text-bar"
        />
          <button type='submit' className="send-icon" onClick={onSendingMessage}>
            <img src={sendIcon} alt="Send" />
          </button>
        </form>
      
    </div>
  );
}

export default Chatbox;

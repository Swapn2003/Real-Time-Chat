import './App.css';
import Topbar from './Components/Topbar';
import Leftpane from './Components/Leftpane';
import Chatpane from './Components/Chatpane';
import UserState from './context/users/userState';
import { SocketProvider } from './context/SocketProvider';
// import { useContext } from 'react';
// import userContext from './context/users/userContext';
import Getin from './Components/Getin';
import useLocalStorage from './hooks/useLocalStorage';
// import MessageState from './context/message/MessageState'
function App() {
  const [myId,setmyId] = useLocalStorage('id');
  // const User = useContext(userContext);
  
  const dashboard = (
        <SocketProvider id={myId}>
          <UserState>
            <div className="all">
              <Topbar myId={myId} setmyId={setmyId}/>
              <div className="below-top">
                <Leftpane myId={myId}/>
                <Chatpane myId={myId} />
              </div>
            </div>
          </UserState>
        </SocketProvider>
  )
  const getin =(
    <UserState> <Getin setmyId={setmyId}/></UserState>
  )
  return (
    <div className="App">
          {myId ? dashboard :getin}
    </div>
  );
}

export default App;

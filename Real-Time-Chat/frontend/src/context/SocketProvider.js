import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  // useEffect(() => {
  //   fetch(`http://localhost:5000/socket.io/?id=${id}`, {
  //     method: 'GET',
  //     mode: 'cors',
  //     credentials: 'same-origin'
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     const newSocket = io.connect('http://localhost:5000', {
  //       query: { id },
  //       transports: ['websocket'],
  //       reconnectionAttempts: 3,
  //       timeout: 10000,
  //       auth: { token: data.token }
  //     });
  //     setSocket(newSocket);
  //   })
  //   .catch(error => {
  //     console.error('Error connecting to socket:', error);
  //   });
  
  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, [id,socket]);
  

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
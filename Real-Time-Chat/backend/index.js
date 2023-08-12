const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const path = require('path');
const bodyParser = require('body-parser');

const userRoutes = require('./Routes/userRoutes')

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS for all routes
console.log('CORS middleware applied');
app.use(express.json())
app.use('/api/user',userRoutes);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log(`server started on port : ${PORT}`));



const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on('connection', socket => {
  console.log("socket io connected")
  const id = socket.handshake.query.id;
  socket.join(id);
  console.log(id)
  
  socket.on('send-message', ({ recipients, text,contactName,isGroupChat,type,locn}) => {
    console.log(recipients,text,type,locn);
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
        contactName,
        isGroupChat,
        type,
        locn:locn
      });
    });
  });
});
    

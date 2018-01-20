const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,"../public");

var app = express();
// var server = http.createServer((req,res) => {
//
// });

var server = http.createServer(app);

var io = socketIO(server);
io.on('connection',(socket)=> {
    console.log("new user connected.");

    // socket.emit('newEmail',{
    //   from:'faizanbijapure@gmail.com',
    //   text:'Hey, what\'s going on.',
    //   createAt:new Date()
    // });
    io.emit('welcome',{
      from:"admin",
      text:"Welcome to chat app",
      createAt:new Date()
    });

    socket.broadcast.emit('newJoinee',{
      from:"admin",
      text:"New User Joined",
      createAt:new Date()
    });

    socket.on('createMessage',(message,callback) => {
        console.log("createMessage", message);
        // socket.broadcast.emit('newMessage',{
        //   from:message.from,
        //   to:message.to,
        //   text:message.text,
        //   createAt:message.createAt
        // });
        callback("Received with thanks.");
    });

    socket.on('disconnect',()=>{
      console.log('User was disconnected');
    });
});



app.use(express.static(publicPath));


app.get('/',(req,res) => {
  res.send("Node chat app started");
});

server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});

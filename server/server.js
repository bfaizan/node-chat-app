  const path = require('path');
  const express = require('express');
  const http = require('http');
  const socketIO = require('socket.io');

  const {Users} = require('./utils/users');

  var {generateMessage,generateLocationMessage} =require('./utils/message');

  const {isRealString} = require('./utils/validation')
  const publicPath = path.join(__dirname,'../public');
  const port = process.env.PORT ||  3000;
  var users = new Users();

  var app=express();
  var server = http.createServer(app);
  var io = socketIO(server);//http://localhost:3000/socket.io/socket.io.js
  io.on('connection',(socket)=>{
   console.log('New user connected');

   socket.on('disconnect',()=>{
     var user = users.removeUser(socket.id);
     console.log(socket.id);
     if(user) {
       io.to(user.room).emit('updateUserList',users.getUserList(user.room));
       io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`))
     }
   });

   socket.on('join',(params,callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
          return callback("Name and Room Name are reuqired");
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));

      socket.emit('newMessage',generateMessage('Admin',`Welcome to ${params.room}`));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined .`));
      callback();
   });

    socket.on('createLocationMessage',(coords) => {
      var user = users.getUser(socket.id);
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(`${user.name}`,coords.latitude ,coords.longitude));
    });
   socket.on('createMessage',(message,callback)=>{
     var user = users.getUser(socket.id);
     if(user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
      }
     callback();
    });







  });



  app.use(express.static(publicPath));
  //Start the server.
  server.listen(port,()=>{
   console.log(`listening on ${port}`);
  });

var socket = io();
socket.on('connect',function() {
  console.log("Connected To server.");

  socket.emit('createMessage',{
    from:"Faizan",
    text:"Hey, Whats up.",
    createAt:new Date()
  });
});
socket.on('disconnect',function() {
  console.log('disconnected from server.')
});

socket.on('newEmail',function(email) {
    console.log("New Email ",email);
});

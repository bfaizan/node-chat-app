const path = require('path');
const express = require('express');
var app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,"../public");
console.log(__dirname+"/../public");
console.log(publicPath);

app.get('/',(req,res) => {
  res.send("Node chat app started");
});

app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});

var express = require('express');


// Constants port
var PORT = 80;

// App
var app = express();
app.get('/', function (req, res){
  res.send('Hello world, Node.js app running on Docker');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
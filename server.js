var path = require('path');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/editor', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, function() {
  console.log('app listening on port 8000');
});
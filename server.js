var express = require('express'),
    app = express.createServer();

app.use(express.static(__dirname))
   .use(express.directory(__dirname, { icons: true }));

app.get('/blah', function(req, res) {
  res.send('Hello world');
});

app.listen(8888, '127.0.0.1', function() {
  var addy = app.address();
  console.log('Server started on http://localhost:8888');
  console.log('Press Ctrl+C to stop');
});
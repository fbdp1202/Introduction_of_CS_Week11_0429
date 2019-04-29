var express = require('express');
var app = express();

mysql = require('mysql');
var connection = mysql.createConnection({
    host: '203.252.106.169',
    port: '3306',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
})
connection.connect();

app.get('/logone', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  var query = connection.query('insert into sensors set ?', r, function(err, rows, cols) {
    if (err) throw err;
      console.log("done");
      console.log('OK: ' + JSON.stringify(r));
    });
  });

// var server = app.listen(80, '203.252.106.169', function () {
// var server = app.listen(8080, '192.168.43.73', function () {
var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(host + ", " + port);
  console.log('listening at http://%s:%s', host, port)
});
const express = require('express')
const app = express()
const fs = require('fs');
const moment = require('moment');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: '203.252.106.169',
    port: '3306',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
})
connection.connect();


app.get('/logone', function (req, res){
	r = req.query;
	console.log("GET %j", r);

	// var qstr = 'select * from sensors where unit = 0 and device = 100 limit 4000';
	var query = connection.query('insert into temphumi set ?', r, function(err, rows, cols) {
		if (err) throw err;
		console.log("done");
		console.log('OK: ' + JSON.stringify(r));
	});
})

app.get('/', function(req, res){
	fs.readFile("index.html", 'utf8', function(err, data) {
		if (err) console.log("file error" + err);
		res.send(data);
	});
});

app.get('/sensor_[0-9]|[0-9][0-9]', function (req, res){
	var cur_path = req.originalUrl
	var cur_address = cur_path.split('_')[1];
	var cur_html = cur_path + ".html";
	// console.log(req.originalUrl)
	// console.log(cur_address)
	// console.log(cur_html)

	var qstr = 'select * from temphumi where device = ' + cur_address;
	var query = connection.query(qstr, function(err, rows, cols) {
		if (err) {
			throw err;
			res.send('query error: ' + qstr);
			return;
		}

		console.log("Got " + rows.length + "records");

		var html = "";
		for (var i=0; i<rows.length; i++) {
		// for (var i=0; i<1; i++) {
			var now = moment(rows[i].time).utc().format("YYYY-MM-DD HH:mm:ss");
			var now0 = (now.split(' ')[0]).split('-');
			var now1 = (now.split(' ')[1]).split(':');
			html += "[ new Date(" 
				 + now0[0] + "," + 
			     + now0[1] + "," +
			     + now0[2] + "," +
			     + now1[0] + "," +
			     + now1[1] + ")," +
				  rows[i].temp + "," + rows[i].humi + "],";
		}
		fs.readFile("mingyo.html", 'utf8', function(err, data) {
			if (err) console.log("file error" + err);
			data = data.replace("<%DATADATA%>", html);
			data = data.replace("<%SENSORDATA%>", cur_address);
			data = data.replace("<%SENSORDATA%>", cur_address);
			res.send(data);
		});
	});
})

var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})
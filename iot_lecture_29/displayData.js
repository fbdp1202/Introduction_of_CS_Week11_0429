const express = require('express')
const app = express()
const fs = require('fs');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: '203.252.106.169',
    port: '3306',
    user: 'sensor',
    password: 'mypassword',
    database: 'data'
})
connection.connect();


app.get('/', function (req, res){
	console.log("param= " + req.query);

	var qstr = 'select * from sensors where unit = 0 and device = 100 limit 4000';
	connection.query(qstr, function(err, rows, cols) {
		if (err) {
			throw err;
			res.send('query error: ' + qstr);
			return;
		}

		console.log("Got " + rows.length + "records");

		var html = "['Time', 'PM2.5']";
		for (var i=0; i<rows.length; i++) {
			html += ",["+ i +","+ rows[i].value + "]";
		}

		fs.readFile("graph.html", 'utf8', function(err, data) {
			if (err) console.log("file error" + err);
			data = data.replace("<%DATADATA%>", html);
			res.send(data);
		});
	});

})

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})
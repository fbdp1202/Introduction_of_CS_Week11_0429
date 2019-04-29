const express = require('express')
const app = express()
const fs = require('fs');

app.get('/', function (req, res){
	// console.log(req.baseUrl);
	// console.log(req.body);
	// console.log(req.hostname);
	// console.log(req.ip);
	console.log(req.query.name);
	console.log(req.query.money);
	console.log(req.query);
	console.log(typeof req.query);
	console.log(typeof JSON.stringify(req.query));
	console.log(typeof JSON.parse(JSON.stringify(req.query)));

	var date = new Date();
	var current_hour = date.getHours();

	fs.appendFile("LOG.TXT", JSON.stringify(req.query) + ', ' + req.ip + ', ' + date +'\n', function(err) {
		if(err) {
			return console.log(err);
		}
	});

	res.send("Hello World");
})

app.get('/item', function (req, res) {
	res.send('Hello World! Hula')
})

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
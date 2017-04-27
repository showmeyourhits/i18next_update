const path = require('path');
const fs = require('fs');
const express = require('express');
const http = require('http');

const port = process.env.PORT || 13579;

console.log(process.argv);
console.log(`STARTING APP ON PORT ${port}`);

const app = express();
const server = http.Server(app);
app.use(express.static(path.resolve('build'), {
	dotfiles: 'allow',
}));

app.get('/', (req, res) => {
	res.sendFile(path.resolve('build/index.html'));
});

app.get('/cities', (req, res) => {
	fs.createReadStream(path.resolve('src/mocks/cities.json')).pipe(res);
	// res.send(path.resolve('src/mocks/cities.json'));
});

server.listen(port);
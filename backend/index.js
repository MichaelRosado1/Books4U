const { response } = require('express');
const express = require('express');
const app = express();

app.get('/', (require, response) => {
	response.send('hello, world');
});

app.get('/author', (require, response) => {
	//example function	
	response.send('Fyodor Dostoevsky');
});

app.listen(3002, () => {
	console.log('running on port 3002');
});

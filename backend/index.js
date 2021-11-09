const { response } = require('express');
const express = require('express');
const app = express();


app.get('/', (require, response) => {
	response.send('hello, world');
});

app.get('/author', (require, response) => {
	//example function	
	response.json({message: 'Fyodor Dostoevsky'});
	console.log('author accessed');
});

app.listen(3002, () => {
	console.log('running on port 3002');
});

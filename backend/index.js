const { response } = require('express');
const express = require('express');
const app = express();

app.get('/', (require, response) => {
	response.send('hello, world');
})

app.listen(3002, () => {
	console.log('running on port 3002')
});

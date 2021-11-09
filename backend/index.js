const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER, 
	password: process.env.PASSWORD, 
	database: process.env.DATABASE
}); 

app.get('/', (require, response) => {
	response.send('hello, world');
});

app.get('/author', (require, response) => {
	//example function	
	console.log('author accessed');
});

//get genres from db
app.get('/search/:genre', (require, response) => {
	console.log('search' + require.params.genre);
})

app.listen(3002, () => {
	console.log('running on port 3002');
});

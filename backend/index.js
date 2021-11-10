const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
	host: '34.136.110.9',
	user: 'root', 
	password:'411', 
	database:'Books4U' 
}); 

db.connect(function (err) {
	if (err) {
		console.error('error connecting: ', err);
		return;
	}
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
	//mySql query
	let sqlQuery = "select * FROM Books4U.Book NATURAL JOIN Books4U.Author WHERE Books4U.Book.genre LIKE '";
	let search = '' + require.params.genre + "';";
	sqlQuery += search;
	console.log(sqlQuery)
	//sending the query
	db.query(sqlQuery, (err,rows, fields) => {
		//checking if an error occurs with the query
        if (err) throw err;

		//stores the result as json values
		const result = Object.values(JSON.parse(JSON.stringify(rows)));	
		//sends the data as json
		response.send(result);
	});
});


app.listen(3002, () => {
	console.log('running on port 3002');
});

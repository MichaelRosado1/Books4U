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

app.get('/authorRatings', (require, response) => {
	//mySql query
	let sqlQuery = "SELECT Author.authorName, AVG(AverageRating.rating) AS avg_rating FROM Book JOIN Author ON Book.authorId = Author.authorId JOIN AverageRating ON Book.ISBN = AverageRating.ISBN GROUP BY Author.authorId ORDER BY avg_rating DESC, Author.authorName DESC;";
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

app.get('/dramaFiction', (require, response) => {
	//mySql query
	let sqlQuery = "(SELECT Books4U.Book.title AS book_title, Books4U.Author.authorName, Books4U.Book.genre FROM Books4U.Book JOIN Books4U.Author ON Books4U.Book.authorId = Books4U.Author.authorId WHERE Books4U.Book.genre LIKE \"Drama\") UNION (SELECT Books4U.Book.title AS book_title, Books4U.Author.authorName, Books4U.Book.genre FROM Books4U.Book JOIN Books4U.Author ON Books4U.Book.authorId = Books4U.Author.authorId WHERE Books4U.Book.genre LIKE \"Fiction\") ORDER BY book_title DESC;";
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

app.post('/api/insert', (require, response) => {
	// const listId = require.body.listId;
	const ISBN = require.body.ISBN;
	const userId = require.body.userId;
	const sqlInsert = "INSERT INTO ‘ToReadList’ (‘ISBN’, ‘userId’) VALUES ('?','?')";
	db.query(sqlInsert, [ISBN, userId], (err, result) => {
		console.log(error);
	})
});

app.put('/api/update/', (require, response) => {
	const ISBN = require.body.ISBN;
	const rating = require.body.rating;
	const sqlUpdate = 'UPDATE ‘AverageRating’ SET ‘rating’ = ? WHERE ‘ISBN’= ?';
	db.query(sqlUpdate, [rating, ISBN], (err, result) => {
		if (err)
		console.log(error);
	})
});

app.listen(3002, () => {
	console.log('running on port 3002');
});

const express = require('express');
const mongo = require('mongodb');
const app = express();
app.use(express.json());

const books = [
{title: 'Harry Potter', id: 1},
{title: 'Twilight', id: 2},
{title: 'Lorien Legacies', id: 3}
]

app.get('/', (req, res) => {
res.send('Welcome to REST API with Node.js Tutorial!!');
});

app.get('/api/books', (req,res)=> {
res.send(books);
});

app.get('/api/books/:id', (req,res)=> {
const book = books.find(c => c.id === parseInt(req.params.id));
 
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);
});

app.delete('/api/books/:id', (req, res) => {
 
const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
const index = books.indexOf(book);
books.splice(index,1);
 
res.send(book);
});

app.get('/api/students', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("students").find({}, { projection: { _id: 0, fname: 1, lname: 1 } }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	}); 
});

app.get('/api/students/:fname', (req,res)=> {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("students").find({}, { projection: { _id: 0, fname: 1, lname: 1 } }).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
		db.close();
	  });
	}); 
});


app.get('/api/test', (req,res)=> {
res.send("Hi this is a test API");
});


const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));
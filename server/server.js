var express = require('express'); 
var bodyParser = require("body-parser"); 
var app = express(); 
app.use(cors()); 
app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })) 
// json sample 
const books = JSON.stringify([ 
{ title: "The Alchemist", author: "Paulo Coelho", year: 1988 }, 
{ title: "The Prophet", author: "Kahlil Gibran", year: 1923 } 
]); 
const farms = JSON.stringify([ 
{ name: "Farm A", description: "nông trại ", image: "1.jpg", temperature: 29.4,  humid: 50.2}, 
{ name: "Farm B", description: "nông trại ", image: "2.jpg", temperature: 25.4,  humid: 53.1}, 
{ name: "Farm C", description: "nông trại ", image: "3.jpg", temperature: 20.1,  humid: 43.4}, 
]); 
//RESTFull API 
app.get('/getAllBooks', function (req, res) { 
res.send(books); 
}) 
app.get('/getAllFarms', function (req, res) { 
res.send(farms); 
}) 
//server 
var server = app.listen(5555, function () { 
var host = server.address().address 
var port = server.address().port 
console.log("Example app listening at http://%s:%s", host, port) 
}) 
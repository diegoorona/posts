var express = require('express');
var app = express();
var mongojs =  require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req,res){

});



app.listen(port, function(){
	console.log('SERVER RUNNING IN PORT: '+ port);
});
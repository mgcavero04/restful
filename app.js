var express=require('express');
    mongoose=require('mongoose');
var db=mongoose.connect('mongodb://localhost:27017/bookAPI');
    bodyParser=require('body-parser');
var Book=require('./models/bookModel');
var assert = require('assert');
var app=express();
var port = process.env.PORT || 3000;

var birds = require('./birds');
app.use('/birds', birds);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter=require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);
app.get('/', function(req, res) {
    res.send('Welcome to my API');
    });







app.listen(port, function(){
    console.log('Gulp is running on PORT: '+ port);
});
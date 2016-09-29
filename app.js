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


var bookRouter=express.Router();
app.get('/', function(req, res) {
    res.send('Welcome to my API');
    
});
app.use('/api', bookRouter);
bookRouter.route('/Books')
.post(function(req, res)
{
    var book= new Book(req.body);
    book.save();
    res.status(201).send(book)
})
.get(function(req,res){
    var query={};
    if(req.query.genre)
    {
        query.genre=req.query.genre;
    }
    Book.find(query, function(err, books){

        assert.equal(null, err);
  
        if(err)
            res.status(500).send(err);
        else
            console.log("Connected successfully to server");
            res.json(books);
        });       
    });
bookRouter.route('/Books/:bookId').get(function(req,res){
    Book.findById(req.params.bookId, function(err, book){

        assert.equal(null, err);
  
        if(err)
            res.status(500).send(err);
        else
            console.log("Connected successfully to server");
            res.json(book);
        });       
    });


app.listen(port, function(){
    console.log('Gulp is running on PORT: '+ port);
});
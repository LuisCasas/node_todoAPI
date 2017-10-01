var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});



app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    // test id: ObjectId("59cd69ef386c8b122415c637")

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            console.log('todo failed');
            return res.status(404).send();
        }
        // console.log('here 2', todo);
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Express up and running');
});

module.exports = {app};
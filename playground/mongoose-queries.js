const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// ObjectId("59b9a52493a6c503df69ade1")
var id =  '59b9a52493a6c503df69ade1';

User.findById(id).then((user) => {
    if(!user){
        console.log('no user with id', id);
    } 

    console.log('User found: ', JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
})

/*
if(!ObjectId.isValid(id)){
    console.log('Invalid id');
}

User.find({
    _id: id
}).then((users) => {
    console.log('Users ', users);
});

User.findOne({
    _id: id
}).then((user) => {
    console.log('One User ', user);
})

User.findById(id).then((user) => {
    console.log('User by id ', user);
});
*/

/*

// ObjectId("59cd69ef386c8b122415c637")


var id = '59cd69ef386c8b122415c6371';

if(!ObjectId.isValid(id)){
    console.log('Invalid format ID');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos ', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo ', todo);
});


Todo.findById(id).then((todo) => {
    console.log('Todo by ID', todo);
}).catch((e) => console.log(e));
*/
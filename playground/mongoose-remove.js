const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove all
/*
Todo.remove().then((result) => {
    console.log(result);
});
*/

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('59d28b2fff7af303713e1bf1').then((todo) => {
    console.log(todo);
});
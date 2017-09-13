var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var newUser = new User({
   email: 'john@ran.com'
});

newUser.save().then((doc) => {
    console.log('User saved', doc);
}, (e) => {
    console.log('error');
});

/*
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var anotherTodo = new Todo({
    text: 'Work at Adobe',
    completed: false
});

anotherTodo.save().then((doc) => {
    console.log('Todo saved', doc);
}, (e) => {
    console.log('Error');
})
*/

/*
mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    }, 
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Study Programming'
});

newTodo.save().then((doc) => {
    console.log('Saved todo', doc);
}, (e) => {
    console.log('error');
});

*/
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userID1 = new ObjectID;
const userID2 = new ObjectID;

const users = [{
    _id: userID1,
    email: 'example@gmail.com',
    password: 'pass123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userID1, access: 'auth'}, 'toBeChanged123').toString()
    }] 
}, {
    _id: userID2,
    email: 'ramon2@g.com',
    password: 'pass123',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userID2, access: 'auth'}, 'toBeChanged123').toString()
    }]  
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator:  userID1
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator:  userID2
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();

        return Promise.all([user1, user2]);
    }).then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers};
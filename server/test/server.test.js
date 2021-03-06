const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('shoudl create a new todo', (done) => {
        var text = 'New todo test!';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();

                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should find todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should NOT find todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id not found', (done) => {

        var invalidID = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${invalidID}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non objects id', (done) => {
        request(app)
            .get('/todos/123jfdnk')
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE todos/:id', () => {
    it('should remove one todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();

                }).catch((e) => done(e));
            });    
    }); 

    it('should NOT remove one todo', (done) => {
        var hexId = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeTruthy();
                    done();

                }).catch((e) => done(e));
            });    
    }); 

    it('should return 404 if todo not found', (done) => {
        var invalidID = new ObjectID().toHexString();
        
        request(app)
            .delete(`/todos/${invalidID}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 if objectid is invalid', (done) => {
        request(app)
            .delete('/todos/123jfdnk')
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end(done);
    });
  
});

describe('PATCH /todos/:id', () =>{
    it('should update todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This is first test';

        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
             //   console.log(es.body.todo.completed);
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });

    it('should NOT update todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This is first test';

        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                completed: true,
                text
            })
            .expect(404)
            .end(done);
    });    

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'Second test';
        
        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});

describe('GET /users/me/', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create new users', (done) => {
        var email = 'ex@email.com';
        var password = '3321cfsnc'

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                // expect(res.headers['x-auth']).toExists();
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err){
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(email);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should validation error if request invalid', (done) => {      
        
        request(app)
            .post('/users')
            .send({
                email: 'email.com', 
                password: 'wde'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email already exists', (done) => {
        var email = 'example@gmail.com';
        var password = '33snjdsc'; 

        request(app)
            .post('/users')
            .send({email})
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should validate user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    // expect(user.token[1]).toInclude({
                    expect(user.toObject().tokens[1]).toMatchObject({
                        access: 'auth',
                        token: res.header['x-auth']
                    });
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 400 and fail authentication', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'some@email.com',
            password: 'password'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeFalsy();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            User.findById(users[1]._id).then((user) => {
                // expect(user.token[1]).toInclude({
                expect(user.tokens.length).toBe(1);
                done();
            }).catch((e) => done(e));
        });
    });
})

describe('DELETE /users/me/token', () => {
    it('should remove ', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            })
    })
});
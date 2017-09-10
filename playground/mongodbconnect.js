// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectId} = require('mongodb');

// var obj = new ObjectID;
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('unable to connect to mongodb server');
    }

    db.collection('Users').find({name: 'Luis'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('No Luis found');
    });

    // console.log('connected to mongodb');
/*
    db.collection('Todos').find().count().then((count) => {
        // console.log(JSON.stringify(docs, undefined, 2));
        console.log(`Total Count ${count}`);
    }, (err) => {
        console.log('unable to fetch');
    });
    */
 /*   
    db.collection('Todos').find({
        _id: new ObjectId("59b45c742d1b870ff697d9e4")
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch');
    });
*/
/*
    db.collection('Todos').insertOne({
        text: 'Time to do something',
        completed: false
    }, (err, res) => {
        if(err){
            return console.log('unable to insert data');
        }

        console.log(JSON.stringify(res.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Luis',
        age: 36,
        location: 'London'
    }, (err, res) => {
        if(err){
            return console.log('Error inserting data');
        }

        console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
    });
*/

//     db.close();
});
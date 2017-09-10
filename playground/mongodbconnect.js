const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('unable to connect to mongodb server');
    }


    /*
    db.collection('Users').deleteMany({name: 'Luis'}).then((res) => {
        console.log(JSON.stringify(res));
    });
*/

    db.collection('Users').findOneAndDelete({
        _id: new ObjectId("59b553ef94b33ee14cef04d9")
    }).then((res) => {
        console.log(res);
    });

/*
    db.collection('Todos').deleteMany({text: 'Do something else'}).then((res) => {
        console.log(res);
    });
*/

/*
    db.collection('Todos').deleteOne({text: 'Time to do something'}).then((res) => {
        console.log(res);
    });
*/

/*
    db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
        console.log(res);
    });
*/
    // findOneAndDelete

//     db.close();
});
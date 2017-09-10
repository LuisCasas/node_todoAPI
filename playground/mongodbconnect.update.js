const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('unable to connect to mongodb server');
    }

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId("59b45a3365f78e0fe90f1eea")
    },{
        $set: {
            name: 'John Nieve'
        },
        $inc: {
            age: 10
        }
    }, {
            returnOriginal: false
    }).then((res) => {
        console.log(res);
    });
    /*
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectId("59b556fe94b33ee14cef0573")
    }, {
        $set: {
            text: 'Complete this course'
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });
*/
//     db.close();
});
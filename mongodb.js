//CRUD operation perform
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; //This is used to connect to MongoDB Function which helps to create a mongodb database connection.
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'employees'
var log = console.log;

MongoClient.connect(connectionURL,{ useNewUrlParser : true, useUnifiedTopology: true}, (err, client) => {
    if(err){
        return log(err);
    }
    
    const db  = client.db(databaseName);


    db.collection('employees').insertMany([
        {
            passowrd: 123456,
            dob: '03/31/1993',
            username: 'pop5',
            salary: 10000
        }
    ]).then((result) => {
        log(result.ops);
    }).catch((err) => {
        log(err);
    });

});
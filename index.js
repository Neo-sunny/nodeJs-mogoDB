
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(url).then((db) => {

    console.log("Connected Correctly to the server");

    dbopr.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
    .then((result) => {
        console.log("Insert documents \n", result.ops);
        return   dbopr.findDocuments(db, "dishes");
      })
    .then((docs) => {
            console.log("Found Documents \n ", docs);
            return  dbopr.updateDocument(db, {name: "Vadonut"}, {description:"Updated Test"}, "dishes");
      })
      .then((result) => {
                console.log("Updated Document: \n ", result.result);
                return dbopr.findDocuments(db, "dishes");
              })
      .then((docs) => {
                 console.log("Found updated Documents \n ", docs);
                 return   db.dropCollection("dishes");
               })
      .then((result) => {
                     console.log("Dropped Collection: ", result);
                     return db.close();
                 })
                 .catch((err) => console.log(err));


})
.catch((err) => console.log(err));

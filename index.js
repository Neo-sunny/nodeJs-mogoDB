
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(url, (err, db) => {

    assert.equal(err, null);
    console.log("Connected Correctly to the server");

    dbopr.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes", (result) => {
        console.log("Insert documents \n"+ result.ops);

        dbopr.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents \n "+ docs);


            dbopr.updateDocument(db, {name: "vadonut"}, {description:"Updated Test"}, "dishes", (result) => {

                console.log("Updated Document "+ result.result);


             dbopr.findDocuments(db, "dishes", (docs) =>{
                 console.log("Found updated Documents \n "+ docs);

                 db.dropCollection("dishes", (result) => {
                     console.log("Dropped Collection: ", result);

                     db.close();
                 });
             });

            });


        });



    });

    });


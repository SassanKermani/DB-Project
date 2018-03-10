const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/`;

const nameOfDb = 'ancon'
const aboutCollection = 'about';
const infoCollection = 'info';

////////////////////////////////////////////////////////

const newThingInDb = {
	name : "seedData",
	dataType : "string"
}

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(nameOfDb);

//   dbo.collection(aboutCollection).insertOne(newThingInDb, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(nameOfDb);
//   dbo.collection(aboutCollection).find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

////////////////////////////////////////////////////////

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(nameOfDb);

//   dbo.collection(infoCollection).drop();

// });

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db(nameOfDb);

//   dbo.collection(aboutCollection).drop();

// });
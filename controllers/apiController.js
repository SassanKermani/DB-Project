/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

//mongo stuff
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = `mongodb://localhost:27017/`;

const nameOfDb = 'ancon'
const aboutCollection = 'about';
// const infoCollection = 'info';

/*=====  End of bringing in and seting up NPM's  ======*/

/*=====================================
=            new Functions            =
=====================================*/

	/*----------  read all docs from a collection  ----------
		req.body{
			collection : <string>,
		}
		db.about.find
	*/
	const read = (req, res)=>{

		let nameOfDb = req.body.collection;

		let tempPromis = new Promise((resolve, reject) =>{
			if (req.body.collection != undefined || req.body.collection != null){

				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection(aboutCollection).find({}).toArray(function(err, result){
						if (err) throw err;
						console.log(result);
						resolve(result);
				    	db.close();
					});
				});
			}else{
				resolve('nope');
			}
		});

		tempPromis.then((tempVar) =>{
			res.send(tempVar);
		});
	}

/*=====  End of new Functions  ======*/

/*----------  exports  ----------*/
module.exports = {
	read
}
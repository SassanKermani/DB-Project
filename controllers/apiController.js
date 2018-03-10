/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

//mongo stuff
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/`;

const nameOfDb = 'ancon'
const aboutCollection = 'about';
const infoCollection = 'info';

/*=====  End of bringing in and seting up NPM's  ======*/

/*=================================
=            funcitons            =
=================================*/

/*----------  Read About  ----------*/
const readAbout = (req, res)=>{

	let tempPromis = new Promise((resolve, reject) =>{
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(aboutCollection).find({}).toArray(function(err, result){
				if (err) throw err;
				//console.log(result);
				resolve(result);
		    	db.close();
			});
		});
	});

	tempPromis.then((tempVar) =>{
		res.send(tempVar);
	});

};

/*----------  Creat About  ----------*/
const creatAbout = (req, res)=>{
	// console.log('at the creatAbout function');

	let tempPromis = new Promise((resolve, reject) =>{
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db(nameOfDb);
			dbo.collection(aboutCollection).find({}).toArray(function(err, result) {
				if (err) throw err;
				//console.log(result);
				resolve(result);
				db.close();
			});
		});
	});

	let doTheThing = false;
	let doTheThing2 = true;
	let newThingInDb;
	let docsInAobutCollection;

	tempPromis.then((tempVar) =>{
		//console.log(tempVar);
		docsInAobutCollection = tempVar;

		// console.log('docsInAobutCollection')
		// console.log(docsInAobutCollection);

		if(req.body.name != null && req.body.name && typeof req.body.name === 'string' ){
			// console.log('name is good');
			if(req.body.dataType != null && req.body.dataType && typeof req.body.dataType === 'string' ){
				// console.log('dataType is good');
				doTheThing = true
				for(let i = 0; i < docsInAobutCollection.length; i++){
					if(req.body.name === docsInAobutCollection[i].name){
						doTheThing2 = false;
					}
				}

			}else{
				res.send('err the dataType was eather null or not of type string');
			}
		}else{
			res.send('err the name was eather null or not of type string')
		}

		if(doTheThing == true && doTheThing2 == true){

			// console.log(req.body)
			// console.log('in the insert if')

			let newThingInDb = [
				{
					'name' : req.body.name,
					'dataType' : req.body.dataType
				}
			]
			// console.log(newThingInDb);

			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				let dbo = db.db(nameOfDb);
				
				dbo.collection(aboutCollection).insertMany(newThingInDb, function(err, res){
					if (err) throw err;
					// console.log('insertOne into the infoCollection');
				db.close();
				});
			});
			res.send(newThingInDb);
		}else{
			res.send('this feild is already in the db');			
		}

		res.send('it broke');
	});

};

/*----------  Read info  ----------*/
const readInfo = (req, res)=>{

	let tempPromis = new Promise((resolve, reject) =>{
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(infoCollection).find({}).toArray(function(err, result){
				if (err) throw err;
				// console.log(result);
				resolve(result);
		    	db.close();
			});
		});
	});

	tempPromis.then((tempVar) =>{
		res.send(tempVar);
	});

};

/*----------  Create info   ----------*/
const creatInfo = (req, res)=>{

	let tempPromis = new Promise((resolve, reject) =>{
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(aboutCollection).find({}).toArray(function(err, result){
				if (err) throw err;
				//console.log(result);
				resolve(result);
		    	db.close();
			});
		});
	});

	tempPromis.then( (tempVar)=>{
		//res.send(tempVar);

		let newThingInDb = {};

		for(let i = 0; i < tempVar.length; i++){

			console.log('tempVar[i].name');
			console.log(tempVar[i].name);

			let hotSecVar = tempVar[i].name;

			console.log('hotSecVar');
			console.log(hotSecVar);

			if(req.body[hotSecVar] != undefined){
				newThingInDb[hotSecVar] = req.body[hotSecVar];
			}

		}

		res.send(newThingInDb);

	});

}

/*=====  End of funcitons  ======*/

/*----------  exports  ----------*/
module.exports = {
	readAbout,
	creatAbout,
	readInfo,
	creatInfo
}
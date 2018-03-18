/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

//mongo stuff
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = `mongodb://localhost:27017/`;

const nameOfDb = 'ancon'
const aboutCollection = 'about';
const infoCollection = 'info';

/*=====  End of bringing in and seting up NPM's  ======*/

/*=================================
=            funcitons            =
=================================*/


/*----------  Read Config  ----------*/
const readConfig = (req, res)=>{

	console.log("readConfig");

	let go = tableIsGo(req.body);

	if( go != null ){

		getConfigTable(req.body.tabal).then(function(foo) {
			// console.log("foo");
			// console.log(foo);
			// console.log("");
			res.send(foo)
		})

	}else{
		res.send('req.bod.tabal is undefined or null');
	}

};

/*----------  Creat Config  ----------*/
const creatConfig = (req, res)=>{

	console.log("creatConfig");

	if( docIsGo(req.body) != null){
		if(req.body.doc.name != null && req.body.doc.name && typeof req.body.doc.name === 'string'){
			if(req.body.doc.dataType != null && req.body.doc.dataType && typeof req.body.doc.dataType === 'string'){

				getConfigTable(req.body.tabal).then(function(foo) {
					// console.log("foo");
					// console.log(foo);
					// console.log("");
					// res.send(foo);

					let doTheThing = true;

					for(let i = 0; i < foo.length; i++){

						if(req.body.doc.name === foo[i].name){
							doTheThing = false;
						}

					}

					let newThingInDb = {
						'name' : req.body.doc.name,
						'dataType' : req.body.doc.dataType

					}

					if(doTheThing === true){
						MongoClient.connect(url, function(err, db) {
							if (err) throw err;
							let dbo = db.db(nameOfDb);
							
							dbo.collection("config_" + req.body.tabal).insertOne(newThingInDb, function(err, res){
								if (err) throw err;
								console.log('insertOne into the infoCollection');
								db.close();
							});
							res.send(newThingInDb);
						});
					}else{
						res.send('thats alread in the tabal');
					}

				})

			}else res.send('req.body.doc.dataType is null or undefined');	
		}else res.send('req.body.doc.name is null or undefined');
	}else res.send('req.body.doc is undefined or null');

};

/*----------  Update Config  ----------*/
const updateConfig = (req, res)=>{
	
	let tabal;
	
	let tempPromis = new Promise((resolve, reject) =>{
		
		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				tabal = "config_" + req.body.tabal;
				console.log("tabal" + tabal)


				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db(nameOfDb);
					dbo.collection( tabal ).find({}).toArray(function(err, result) {
						if (err) throw err;
						//console.log(result);
						resolve(result);
						db.close();
					});
				});
			}else resolve(null);
		}else resolve(null);
	});

	let doTheThing = false;
	let doTheThing2 = true;

	tempPromis.then((tempVar) =>{

		if(tempVar != null){
			if( req.body.id != null || req.body.id != undefined ){
				if(req.body.doc != undefined && typeof req.body.doc === 'object' ){
					if(req.body.doc.name != null && req.body.doc.name && typeof req.body.doc.name === 'string' ){
						console.log('name is good');
						if(req.body.doc.dataType != null && req.body.doc.dataType && typeof req.body.doc.dataType === 'string' ){
							console.log('dataType is good');
							doTheThing = true
							for(let i = 0; i < tempVar.length; i++){
								if(req.body.doc.name === tempVar[i].name){
									doTheThing2 = false;
								}
							}

						}else res.send('err the dataType was eather null or not of type string');
					}else res.send('err the name was eather null or not of type string')
				}else res.send('req.body.doc is undefined or not an object');
			}else res.send('req.body.id is null')

			if(doTheThing == true && doTheThing2 == true){

				console.log("in the spot");

				let newThingInDb =
				{
					'name' : req.body.doc.name,
					'dataType' : req.body.doc.dataType
				};

				let query = { _id : ObjectId(req.body.id) };

				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection(tabal).updateOne(query, {$set: newThingInDb}, function(err, res) {
						if (err) throw err;
						console.log("1 document updated");
						db.close();
					});
				});
				
				res.send(newThingInDb);
			
			}else res.send('it broke');
		}else res.send("req.body.tabal is undefined or null");
	});

}

/*----------  Delete Config  ----------*/
const deleteConfig = (req, res)=>{

	let deleteIsGo = false;
	let query;

	if(req.body.tabal != undefined || req.body.tabal != null ){
		if(req.body.tabal.length != 0){
			tabal = "config_" + req.body.tabal;
			console.log("tabal" + tabal)

			if(req.body.id != null || req.body.id != undefined){
				deleteIsGo = true;
				query = { _id : ObjectId(req.body.id) };
			}else{
				res.send('id is null or undefined');
			}

			if(deleteIsGo === true){
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db(nameOfDb);
					dbo.collection(tabal).deleteOne(query, function(err, obj) {
						if (err) throw err;
						console.log("1 document deleted");
						db.close();
					});
				});
				res.send('you just deleted that thing and it can not be restored ever');	
			}else res.send('you broke it');
		}else res.send("req.body.tabal is undefined or null");
	}else res.send("req.body.tabal is undefined or null");

}

/*----------  Query Config  ----------*/

const queryConfig = (req, res)=>{

	query = {};

	let tempPromis = new Promise((resolve, reject) =>{

		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				tabal = "config_" + req.body.tabal;
				// console.log("tabal" + tabal)

				if(req.body.id != null || req.body.id != undefined){
					query._id = ObjectId(req.body.id);
				}

				if(req.body.doc != null || req.body.doc != undefined){
					if(req.body.doc.name != null || req.body.doc.name != undefined){
						query.name = req.body.doc.name;
						console.log('yep');
					}
					if(req.body.doc.dataType != null || req.body.doc.dataType != undefined){
						query.dataType = req.body.doc.dataType;
					}
				}

				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection(tabal).find(query).toArray(function(err, result) {
						if (err) throw err;
						// console.log(result);
						resolve(result);
				    	db.close();
					});
				});

			}else resolve(null);
		}else resolve(null);

	});

	tempPromis.then((tempVar) =>{
		
		if(tempVar != null){

			// console.log(query);

			res.send({
				"query" : query,
				"results" : tempVar
			});

		}else res.send('req.body.tabal is undefined or null');

	});

}

/*---------------------------------------------------------------------------------------------------*/

/*----------  Read info  ----------*/
const readInfo = (req, res)=>{

	let tempPromis = new Promise((resolve, reject) =>{
		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				let tabal = req.body.tabal;
				console.log(tabal);
				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection(tabal).find({}).toArray(function(err, result){
						if (err) throw err;
						//console.log(result);
						resolve(result);
				    	db.close();
					});
				});
			}else resolve(null); 
		}else resolve(null); 
	});

	tempPromis.then((tempVar) =>{
		if( tempVar != null){
			res.send(tempVar);
		}else res.send("req.body.tabal is undefined or null");
	});

};

/*----------  Create Info   ----------*/
const creatInfo = (req, res)=>{

	let tabal;

	let tempPromis = new Promise((resolve, reject) =>{
		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				tabal = req.body.tabal;
				console.log(tabal);
				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection('config_' + tabal).find({}).toArray(function(err, result){
						if (err) throw err;
						//console.log(result);
						resolve(result);
				    	db.close();
					});
				});
			}else resolve(null); 
		}else resolve(null); 
	});

	tempPromis.then( (tempVar)=>{
		//res.send(tempVar);

		console.log('tempVar');
		console.log(tempVar)

		if(tempVar != null){

			let newThingInDb = {};
			let insertIsGo = true;

			for(let i = 0; i < tempVar.length; i++){

				console.log('tempVar[i].name');
				console.log(tempVar[i].name);

				// console.log('hotSecVar');
				// console.log(hotSecVar);

				if(req.body.doc[tempVar[i].name] != undefined  || req.body.doc[tempVar[i].name] != null){
					if( typeof req.body.doc[tempVar[i].name] === tempVar[i].dataType ){
						newThingInDb[tempVar[i].name] = req.body.doc[tempVar[i].name];
						insertIsGo = true;
					}else{
						insertIsGo = false;
						res.send(`datatype of ${tempVar[i].name} is not correct`);
					}
					
				}

			}

			console.log(newThingInDb);

			if(insertIsGo === true){
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					
					dbo.collection(tabal).insertOne(newThingInDb, function(err, res){
						if (err) throw err;
						// console.log('insertOne into the infoCollection');
						// res.send(newThingInDb);
					db.close();
					});
				});
				res.send(newThingInDb);
			}

		}else req.send('req.bod.tabal is null or undefined');

	});
	// res.send('it broke');
}

/*----------  Upadte Info  ----------*/
const updateInfo = (req, res)=>{

	let newThingInDb = {};
	let updateIsGo = true;
	let tabal;

	let tempPromis = new Promise((resolve, reject) =>{
		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				tabal = req.body.tabal;
				console.log(tabal);
				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection('config_' + tabal).find({}).toArray(function(err, result){
						if (err) throw err;
						//console.log(result);
						resolve(result);
				    	db.close();
					});
				});
			}else resolve(null); 
		}else resolve(null); 
	});


	tempPromis.then((tempVar)=>{
		for(let i = 0; i < tempVar.length; i++){

			if(req.body.id != null || req.body.id != undefined){
				if(req.body.doc != undefined && typeof req.body.doc === 'object' ){
					if(req.body.doc[tempVar[i].name] != undefined ){
						if( typeof req.body.doc[tempVar[i].name] === tempVar[i].dataType ){
							newThingInDb[tempVar[i].name] = req.body.doc[tempVar[i].name];
						}else{
							res.send(`datatype of ${tempVar[i].name} is not correct`);
							updateIsGo = false;
						}
					}
				}else{
					res.send(`the req.body.doc is undefined or is not of type object`);
					updateIsGo = false;
				}
			}else{
				res.send(`the req.body.id is undefined`);
				updateIsGo = false;
			}

		}
		// console.log('req.body.id');
		// console.log(req.body.id);
		// console.log('req.body.doc');
		// console.log(req.body.doc);
		// console.log('newThingInDb');
		// console.log(newThingInDb);
		// res.send(newThingInDb);

		if(updateIsGo === true){

			let query = { _id : ObjectId(req.body.id) };

			// console.log('newThingInDb');
			// console.log(newThingInDb);
			// console.log()
			// console.log('query');
			// console.log(query);


			MongoClient.connect(url, function(err, db){
				if (err) throw err;
				let dbo = db.db(nameOfDb);
				dbo.collection(tabal).updateOne(query, {$set: newThingInDb}, function(err, res) {
					if (err) throw err;
					console.log("1 document updated");
					db.close();
				});
			});
			res.send(newThingInDb);

			// // test to make sure my query works
			// MongoClient.connect(url, function(err, db){
			// 	if (err) throw err;
			// 	let dbo = db.db(nameOfDb);
			// 	dbo.collection(infoCollection).find(query).toArray(function(err, result) {
			// 		if (err) throw err;
			// 		console.log('test result');
			// 		console.log(result);
			// 		db.close();
			// 	});
			// });

		}

	})

}

/*----------  Delete Info  ----------*/

const deleteInfo = (req, res)=>{

	let deleteIsGo = false;
	let query;

	if(req.body.tabal != undefined || req.body.tabal != null ){
		if(req.body.tabal.length != 0){
			tabal = req.body.tabal;
			console.log("tabal" + tabal)

			if(req.body.id != null || req.body.id != undefined){
				deleteIsGo = true;
				query = { _id : ObjectId(req.body.id) };
			}else{
				res.send('id is null or undefined');
			}

			if(deleteIsGo === true){
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db(nameOfDb);
					dbo.collection(tabal).deleteOne(query, function(err, obj) {
						if (err) throw err;
						console.log("1 document deleted");
						db.close();
					});
				});
				res.send('you just deleted that thing and it can not be restored ever');	
			}else res.send('you broke it');
		}else res.send("req.body.tabal is undefined or null");
	}else res.send("req.body.tabal is undefined or null");

}

/*----------  Query Info  ----------*/

const queryInfo = (req, res)=>{
	/*
	* see if there is an id
	* run though a for loop to get all about docs
	* see if there is anything in any of the about docs
	* do the search
	{
		id : ,
		doc{
			" " : " ",
			.
			.
			.
		} 
	}
	*/

	let tabal;

	let tempPromis = new Promise((resolve, reject) =>{
		if(req.body.tabal != undefined || req.body.tabal != null ){
			if(req.body.tabal.length != 0){
				tabal = req.body.tabal;
				console.log(tabal);
				MongoClient.connect(url, function(err, db){
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					dbo.collection('config_' + tabal).find({}).toArray(function(err, result){
						if (err) throw err;
						//console.log(result);
						resolve(result);
				    	db.close();
					});
				});
			}else resolve(null); 
		}else resolve(null); 
	});

	tempPromis.then((tempVar)=>{

		if(tempVar != null){

			let query = {};

			if(req.body.id != undefined || req.body.id != null ){	
				query._id = ObjectId(req.body.id)
			}
			
			if(req.body.doc != undefined || req.body.doc != null){
				for(let i = 0; i < tempVar.length; i++){
					if(req.body.doc[tempVar[i].name] != null || req.body.doc[tempVar[i].name] != undefined){
						query[tempVar[i].name] = req.body.doc[tempVar[i].name];
					}
				}
			}

			

			let data;

			MongoClient.connect(url, function(err, db){
				if (err) throw err;
				let dbo = db.db(nameOfDb);
				dbo.collection(tabal).find(query).toArray(function(err, result){
					if (err) throw err;
					data = result;
					res.send({
						"query" : query,
						"results" : result
					});
					// console.log(result);
			    	db.close();
				});
			});

		}else{
			req.send('req.body.tabal is undefined or null');
		}

	})

}

/*=====  End of funcitons  ======*/

/*============================================================
=            Rework of how logic is going to work            =
============================================================*/

// req.body.table is good
const tableIsGo = (body)=>{
	let tabal = null;
	if(body.tabal != undefined && body.tabal != null ){
		if(body.tabal.length != 0){
			tabal = body.tabal; 
		}
	}
	return tabal;
}

//req.body.doc is good
const docIsGo = (body)=>{
	let doc = null;
	if(body.doc != null || body.doc ){
		if(typeof body.doc === 'object'){
			doc = body.doc;
		}
	}
	return doc;
}

//req.body.id is good
const idIsGo = (body)=>{
	let id = null;
	if(body.id != null || body.id ){
		id = body.id;
	}
	return id;
}

//Get Config Tabl
const getConfigTable = (tabal)=>{
  
	let promis = new Promise((resolve, reject)=>{
    
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db('ancon');
			dbo.collection('config_' + tabal).find({}).toArray(function(err, result){
			if (err) throw err;
			//console.log(result);
			resolve(result);
			db.close();
			});
		});

	});

	return promis.then((result)=>{
		// console.log("result");
		// console.log(result);
		// console.log("");
		return result;
	})

};

//this is an example of who to call this 

// getConfigTable("people").then(function(foo) {
// 	console.log("foo");
// 	console.log(foo);
// 	console.log("");
// 	return foo;
// })


/*=====  End of Rework of how logic is going to work  ======*/


/*----------  exports  ----------*/
module.exports = {
	readConfig,
	creatConfig,
	updateConfig,
	deleteConfig,
	queryConfig,
	readInfo,
	creatInfo,
	updateInfo,
	deleteInfo,
	queryInfo
}
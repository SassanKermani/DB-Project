/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

//mongo stuff
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = `mongodb://localhost:27017/`;

const nameOfDb = 'ancon'
// const aboutCollection = 'about';
// const infoCollection = 'info';

/*=====  End of bringing in and seting up NPM's  ======*/

/*=================================
=            funcitons            =
=================================*/


/*----------  Read Config  ----------*/
const readConfig = (req, res)=>{

	console.log("readConfig");

	let go = tableIsGo(req.body);

	if( go != null ){

		getConfigTable(req.body.table).then(function(foo) {
			// console.log("foo");
			// console.log(foo);
			// console.log("");
			res.send(foo)
		})

	}else res.send('req.bod.table is undefined or null');

};

/*----------  Creat Config  ----------*/
const creatConfig = (req, res)=>{

	console.log("creatConfig");

	let go = tableIsGo(req.body);

	if( go != null ){
		if( docIsGo(req.body) != null){
			if(req.body.doc.name != null && req.body.doc.name && typeof req.body.doc.name === 'string'){
				if(req.body.doc.dataType != null && req.body.doc.dataType && typeof req.body.doc.dataType === 'string'){

					getConfigTable(req.body.table).then(function(foo) {

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

						let table = "config_" + req.body.table

						console.log('table');
						console.log(table);

						if(doTheThing === true){
							MongoClient.connect(url, function(err, db) {
								if (err) throw err;
								let dbo = db.db(nameOfDb);
								
								dbo.collection(table).insertOne(newThingInDb, function(err, res){
									if (err) throw err;
									console.log('insertOne into the infoCollection');
									db.close();
								});
								res.send(newThingInDb);
							});
						}else res.send('thats alread in the table');

					})

				}else res.send('req.body.doc.dataType is null or undefined');	
			}else res.send('req.body.doc.name is null or undefined');
		}else res.send('req.body.doc is undefined or null');
	}else res.send('req.body.table is not undefined or null');

};

/*----------  Update Config  ----------*/
const updateConfig = (req, res)=>{

	console.log("updateConfig");

	let go = tableIsGo(req.body);

	if( go != null){
		if( idIsGo(req.body) != null){
			let query = { _id : ObjectId(req.body.id) };
			if(docIsGo(req.body) != null){

				let newThingInDb;

				if(req.body.doc.name != null && req.body.doc.name && typeof req.body.doc.name === 'string'){
					if(req.body.doc.dataType != null && req.body.doc.dataType && typeof req.body.doc.dataType === 'string'){
							newThingInDb =
							{
								'name' : req.body.doc.name,
								'dataType' : req.body.doc.dataType
							};

							MongoClient.connect(url, function(err, db){
								if (err) throw err;
								let dbo = db.db(nameOfDb);
								dbo.collection("config_" + req.body.table).updateOne(query, {$set: newThingInDb}, function(err, res) {
									if (err) throw err;
									console.log("1 document updated");
									db.close();
								});
							});	

							res.send(newThingInDb);

					}else res.send('req.body.doc.dataType is null or undefined or not of type string')
				}else res.send('req.body.doc.name is null or undefined or not of type string')

			}else res.send('req.body.doc is null or undefined');
		}else res.send('req.bod.id is null or undefined');
	}else res.send('req.bod.table is null or undefined');

}

/*----------  Delete Config  ----------*/
const deleteConfig = (req, res)=>{

	console.log('deleteConfig');

	let go = tableIsGo(req.body);

	if( go != null){
		if( idIsGo(req.body) != null){

			query = { _id : ObjectId(req.body.id) };

			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db(nameOfDb);
				dbo.collection("config_" + req.body.table).deleteOne(query, function(err, obj) {
					if (err) throw err;
					console.log("1 document deleted");
					db.close();
				});
			});

			res.send('1 document deleted')

		}else res.send('req.body.id is undefined or null');
	}else res.send('req.body.table is undefined or null');

}

/*----------  Query Config  ----------*/

const queryConfig = (req, res)=>{

	console.log('queryConfig');

	let query = {};
	let go = tableIsGo(req.body);

	if( go != null){

		if( idIsGo(req.body) != null){
			query._id = ObjectId(req.body.id);
		}

		if( docIsGo(req.body) ){

			if(req.body.doc.name != null || req.body.doc.name != undefined){
				query.name = req.body.doc.name;
			}

			if(req.body.doc.dataType != null || req.body.doc.dataType != undefined){
				query.dataType = req.body.doc.dataType;
			}

		}

		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection("config_" + req.body.table).find(query).toArray(function(err, result) {
				if (err) throw err;
				// res.send(result);
				res.send({
							"query" : query,
							"results" : result
						});
				db.close();
			});
		});

	}else res.send('req.body.table is undefined or null');

}

/*----------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------				Info 					----------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------*/

/*----------  Read info  ----------*/
const readInfo = (req, res)=>{

	console.log('readInfo');

	let go = tableIsGo(req.body);

	if( go != null ){

		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(req.body.table).find({}).toArray(function(err, result){
				if (err) throw err;
				res.send(result);
				db.close();
			});
		});

	}else res.send(req.body);

};

/*----------  Create Info   ----------*/
const creatInfo = (req, res)=>{

	console.log("creatInfo");

	let go = tableIsGo(req.body);

	if( go != null ){
		if(docIsGo(req.body)){
			getConfigTable(req.body.table).then(function(foo) {
				
				let newThingInDb = {};

				for(let i = 0; i < foo.length; i++){
					if(req.body.doc[foo[i].name] != undefined || req.body.doc[foo[i].name] != null){
						if(typeof req.body.doc[foo[i].name] === foo[i].dataType){

							newThingInDb[foo[i].name] = req.body.doc[foo[i].name]
						
						}
					}
				}

				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					let dbo = db.db(nameOfDb);
					
					dbo.collection(req.body.table).insertOne(newThingInDb, function(err, res){
						if (err) throw err;
						console.log('insertOne into the infoCollection');
						db.close();
					});
					res.send(newThingInDb);
				});

			})
		}else req.send('req.body.doc is undefined or null')
	}else res.send('req.bod.table is undefined or null');

}

/*----------  Upadte Info  ----------*/
const updateInfo = (req, res)=>{

	console.log('updateInfo');

	let go = tableIsGo(req.body);

	if( go != null){
		if( idIsGo(req.body) != null){
			let query = { _id : ObjectId(req.body.id) };
			if(docIsGo(req.body) != null){
				getConfigTable(req.body.table).then(function(foo){
					
					let newThingInDb = {};

					for(let i = 0; i < foo.length; i++){
						if(req.body.doc[foo[i].name] != undefined || req.body.doc[foo[i].name] != null){
							if(typeof req.body.doc[foo[i].name] === foo[i].dataType){

								newThingInDb[foo[i].name] = req.body.doc[foo[i].name]
							
							}
						}
					}

					MongoClient.connect(url, function(err, db) {
						if (err) throw err;
						let dbo = db.db(nameOfDb);
						
						dbo.collection(req.body.table).updateOne(query, {$set: newThingInDb}, function(err, res){
							if (err) throw err;
							console.log('insertOne into the infoCollection');
							db.close();
						});
						res.send(newThingInDb);
					});

				})
			}
		}else res.send('req.body.table is undefined or null');
	}else res.send('req.body.table is undefined or null');

}

/*----------  Delete Info  ----------*/

const deleteInfo = (req, res)=>{

	console.log("deleteInfo");

	let go = tableIsGo(req.body);

	if( go != null){
		if( idIsGo(req.body) != null){

			let query = { _id : ObjectId(req.body.id) };

			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db(nameOfDb);
				dbo.collection(req.body.table).deleteOne(query, function(err, obj) {
					if (err) throw err;
					console.log("1 document deleted");
					db.close();
				});
			});
			res.send('1 document deleted');
		}else res.send('req.body.id is undefined or null');
	}else res.send('req.body.table is undefined or null');

}

/*----------  Query Info  ----------*/

const queryInfo = (req, res)=>{

	console.log('queryInfo');

	let go = tableIsGo(req.body);

	if( go != null){
		let query = {};
		if( idIsGo(req.body) != null) query = { _id : ObjectId(req.body.id) };
		if(docIsGo(req.body) != null){
			getConfigTable(req.body.table).then(function(foo){

				for(let i = 0; i < foo.length; i++){
					if(req.body.doc[foo[i].name] != undefined || req.body.doc[foo[i].name] != null){
						if(typeof req.body.doc[foo[i].name] === foo[i].dataType){

							// newThingInDb[foo[i].name] = req.body.doc[foo[i].name]
							query[foo[i].name] = req.body.doc[foo[i].name];
						
						}
					}
				}

				console.log(query);

			});
		}

		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(req.body.table).find(query).toArray(function(err, result) {
				if (err) throw err;
				// res.send(result);
				res.send({
					"query" : query,
					"results" : result
				});
				db.close();
			});
		});

	}else res.send('req.body.table is undefined or null');
}

/*----------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------					Both 				----------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------*/

/*----------  See All Tables  ----------*/
const seeAllTables = (req, res)=>{

	MongoClient.connect(url, function(err, db){
		if (err) throw err;
		
		let dbo = db.db(nameOfDb);
		
		dbo.listCollections().toArray(function(err, result) {
			
			let newResult = [];

			for(let i = 0; i < result.length; i++){
				
				let ii = 0;

				if(result[i].name.includes("config_") != true ){
					newResult[ii] = result[i].name;
					ii++;
				}

			}

			// console.log(newResult);
			res.send(newResult);

			db.close();
		});
	});
}



/*----------  Get All Config  ----------*/					//I think this is a desink problam... 
const getAllConfig = (req, res)=>{

	console.log('getAllConfig');

	let newResult = [];
	let allTheThings = {};

		let promise = new Promise((resolve, reject) => {
			MongoClient.connect(url, function(err, db){
				if (err) throw err;
				let dbo = db.db('ancon');
				dbo.listCollections().toArray(function(err, result) {
					for(let i = 0; i < result.length; i++){
						let ii = 0;
						if(result[i].name.includes("config_") === true ){
							newResult[ii] = result[i].name;
							ii++;
						}
					}
					resolve(result);
					db.close();
				});
			});
		});

		promise.then((data) => {
			console.log(newResult);
		});

}

// getAllConfig();

/*=====  End of funcitons  ======*/



/*----------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------			Genral purpus 				----------------------------------------
------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------*/

// req.body.table is good
const tableIsGo = (body)=>{
	let table = null;
	// console.log('body.table');
	// console.log(body.table);
	if(body.table != undefined && body.table != null ){
		if(body.table.length != 0){
			table = body.table; 
		}
	}
	return table;
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
		if(body.id.length != 0){
			id = body.id;
		}
	}
	return id;
}

//Get Config Tabl
const getConfigTable = (table)=>{
  
	let promise = new Promise((resolve, reject)=>{
    
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			let dbo = db.db('ancon');
			dbo.collection('config_' + table).find({}).toArray(function(err, result){
				if (err) throw err;
				//console.log(result);
				resolve(result);
				db.close();
			});
		});

	});

	return promise.then((result)=>{
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
	queryInfo,

	seeAllTables,
	getAllConfig

}
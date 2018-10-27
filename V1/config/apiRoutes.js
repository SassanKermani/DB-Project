/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController.js');

/*=====  End of bringing in and seting up NPM's  ======*/

/*=============================
=            routs            =
=============================*/

// all endpoints and defult rout
router.get('/', function(req, res){
	res.send(apiEndpoints);
});

router.post('/', function(req, res){
	res.send(apiEndpoints);
});

/*---------------------------------------------------------------------*/

//read all docs in the config collection 
router.post('/readConfig', controller.readConfig);

//creat new doc in the config collection
router.post('/creatConfig', controller.creatConfig);

//update a doc in the config collection
router.post('/updateConfig', controller.updateConfig);

//delete a doc in the config collection
router.post('/deleteConfig', controller.deleteConfig);

//query a doc in the config collection
router.post('/queryConfig', controller.queryConfig);


/*---------------------------------------------------------------------*/


// read all docs in the info collection
router.post('/readInfo', controller.readInfo);

//creat a new doc in the info collection
router.post('/creatInfo', controller.creatInfo);

//update a doc in the info collection
router.post('/updateInfo', controller.updateInfo);

//delete a doc in the info collection
router.post('/deleteInfo', controller.deleteInfo);

//query a doc in the info collection
router.post('/queryInfo', controller.queryInfo);

/*---------------------------------------------------------------------*/

router.post('/seeAllTables', controller.seeAllTables);

router.post('/getAllConfig', controller.getAllConfig);

router.get('/getDb', controller.getDb);

/*=====  End of routs  ======*/

/*----------  object that shows all endpoints for api  ----------*/
const apiEndpoints = {
	"/api" : "list of all api endpoints",

	"config collection" : {
		"/api/readConfig" : "post rout sends all docs in config collection",
		"/api/creatConfig" : "post rout creat new doc in config collection",
		"/api/updateConfig" : "post rout update a doc in config collection based on id",
		"/api/deleteConfig" : "post route delete a doc in config collection based on id",
		"/api/queryConfig" : "post route query search for doc in the config collection"
	},

	"info collection" : {
		"/api/readInfo" : "post rout sends all docs in info collection",
		"/api/creatInfo" : "post rout creat new doc in info collection",
		"/api/updateInfo" : "post rout update a doc in info collection based on id",
		"/api/deleteInfo" : "post route delete a doc in info collection based on id",
		"/api/queryInfo" : "post route query search for doc in the info collection"
	},

	"both" : {
		"/api/seeAllTables" : "post rout sends array of all schemas in db",
		"/api/getAllConfig" : "post rout sends array of all schemas in db with schema",
	},

	"what req.body example" : "{ id:<id>, table:<table>, doc:<{ <something>: <something>, ... }> }"

}
/*----------  exports  ----------*/
module.exports = router;
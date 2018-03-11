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
router.get('/api/', function(req, res){
	res.send(apiEndpoints);
});

/*---------------------------------------------------------------------*/

//read all docs in the about collection 
router.get('/api/readAbout', controller.readAbout);

//creat new doc in the about collection
router.post('/api/creatAbout', controller.creatAbout);

//update a doc in the about collection
router.post('/api/updateAbout', controller.updateAbout);

//delete a doc in the about collection
router.post('/api/deleteAbout', controller.deleteAbout);

/*---------------------------------------------------------------------*/


// read all docs in the info collection
router.get('/api/readInfo', controller.readInfo);

//creat a new doc in the info collection
router.post('/api/creatInfo', controller.creatInfo);

//update a doc in the info collection
router.post('/api/updateInfo', controller.updateInfo);

//delete a doc in the info collection
router.post('/api/deleteInfo', controller.deleteInfo);

/*=====  End of routs  ======*/

/*----------  object that shows all endpoints for api  ----------*/
const apiEndpoints = {
	'/api' : 'list of all api endpoints',

	'about collection' :{
		'/api/readAbout' : 'get rout sends all docs in about collection',
		'/api/creatAbout' : 'post rout creat new doc in about collection',
		'/api/updateAbout' : 'post rout update a doc in about collection based on id',
		'/api/deleteAbout' : 'post route delete a doc in about collection based on id'
	},

	'info collection' :{
		'/api/readInfo' : 'get rout sends all docs in info collection',
		'/api/creatInfo' : 'post rout creat new doc in info collection',
		'/api/updateInfo' : 'post rout update a doc in info collection based on id',
		'/api/deleteInfo' : 'post route delete a doc in info collection based on id'
	}


}
/*----------  exports  ----------*/
module.exports = router;
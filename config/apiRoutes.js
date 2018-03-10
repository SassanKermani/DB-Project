/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

const express = require('express');
const router = express.Router();

const controllor = require('../controllers/apiController.js')

/*=====  End of bringing in and seting up NPM's  ======*/

/*=============================
=            routs            =
=============================*/

// all endpoints and defult rout
router.get('/api/', function(req, res){
	res.send(apiEndpoints);
});

//read all docs in the about collection 
router.get('/api/readAbout', controllor.readAbout);

//creat new doc in the about collection
router.post('/api/creatAbout', controllor.creatAbout);

// read all docs in the info collection
router.get('/api/readInfo', controllor.readInfo);

//creat a new doc in the info collection
router.post('/api/creatInfo', controllor.creatInfo);

/*=====  End of routs  ======*/

/*----------  object that shows all endpoints for api  ----------*/
const apiEndpoints =  {
	'/api' : 'list of all api endpoints',
	'about collection' :{
		'/api/readAbout' : 'get rout sends all docs in the about collection',
		'/api/creatAbout' : 'post rout creat new doc in about collection'
	},
	'info collection' :{
		'/api/readInfo' : 'get rout sends all docs in the info collection',
		'/api/creatInfo' : 'post rout creat new doc in info collection'
	}


}
/*----------  exports  ----------*/
module.exports = router;
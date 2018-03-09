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
router.post('/api/creatAbout', controllor.creatAbout)

/*=====  End of routs  ======*/

/*----------  object that shows all endpoints for api  ----------*/
const apiEndpoints =  {
	'/api' : 'list of all api endpoints',
	'about collection' :{
		'readAbout' : 'get rout sends all docs in the about collection',
		'creatAbout' : 'post rout creat new doc in about collection'
	}


}
/*----------  exports  ----------*/
module.exports = router;
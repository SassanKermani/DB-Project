/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

const 
	express = require('express'),
	app = express(),
	port = 3000,
	bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));


/*=====  End of bringing in and seting up NPM's  ======*/

/*====================================================
=            conecting out to other files            =
====================================================*/

//router
const apiRouter = require('./config/apiRoutes.js');

//conecting to the router
app.use('/api', apiRouter);

//defult rout
app.get('/*', function(req, res){
	res.send('that dose not aprear to be a rout, try /api for now');
})

/*=====  End of conecting out to other files  ======*/

app.listen(port, function(){
	console.log(`up at ${port}`);
})
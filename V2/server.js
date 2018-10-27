/*==============================
=            Set up            =
==============================*/

const 
	express = require('express'),
	app = express(),
	port = 3000;


/*=====  End of Set up  ======*/





/*----------  listen  ----------*/
app.listen(port, function(){
	console.log(`up at ${port}`);
})
/*=======================================================
=            bringing in and seting up NPM's            =
=======================================================*/

const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController.js');

/*=====  End of bringing in and seting up NPM's  ======*/

/*=================================
=            new Routs            =
=================================*/

router.post('/read', controller.read);

/*=====  End of new Routs  ======*/



/*----------  exports  ----------*/
module.exports = router;
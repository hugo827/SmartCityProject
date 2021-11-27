const Router = require("express-promise-router");
const router = new Router();

const accountController = require('../controleur/account');
const JWTMiddleWare = require('../middleware/identification');
const inscription = require('../middleware/inscription');

router.get('/account', JWTMiddleWare.identification,  accountController.login);
router.post('/', JWTMiddleWare.identification, inscription.verifAccount, accountController.inscription);

module.exports =  router;
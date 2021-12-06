const Router = require("express-promise-router");
const router = new Router();

const accountController = require('../controleur/account');
const inscription = require('../middleware/inscription');

const JWTMiddleWare = require('../middleware/identification');
const AuthoMiddleware = require("../middleware/authorization");

router.get('/nb', accountController.getCountAccount);
router.get('/all/:offset', accountController.getAllAccount);
router.get('/login',  accountController.login);
router.post('/', inscription.verifAccount, accountController.inscription);

//router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, accountController.patchAccount);
//router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, accountController.deleteAccount);

module.exports =  router;
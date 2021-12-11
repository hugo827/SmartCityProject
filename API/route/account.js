const Router = require("express-promise-router");
const router = new Router();

const accountController = require('../controleur/account');
const inscription = require('../middleware/inscription');

const JWTMiddleWare = require('../middleware/identification');
const AuthoMiddleware = require("../middleware/authorization");

router.get('/nb', accountController.getCountAccount);
router.post('/login',  accountController.login);
router.get('/admin', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, module.exports.result = (req, res) => {  res.json( {  "admin" : true});} )
router.get('/:id', accountController.getAccountId);
router.get('/all/:offset', accountController.getAllAccount);
router.post('/', inscription.verifAccount, accountController.inscription);

//router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, accountController.patchAccount);
//router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, accountController.deleteAccount);

module.exports =  router;
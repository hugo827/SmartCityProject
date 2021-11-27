const Router = require("express-promise-router");
const router = new Router;

const ReadedTomeControleur = require("../controleur/readedTome");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");



router.get('/', ReadedTomeControleur.getReadedTome);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.postReadedTome);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.patchReadedTome);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.deleteReadedTome);

module.exports = router;
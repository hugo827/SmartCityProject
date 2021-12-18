const Router = require("express-promise-router");
const router = new Router;

const TomeControleur = require("../controleur/tome");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");


router.get('/nb', TomeControleur.getCountTome);
router.get('/all/:offset', TomeControleur.getAllTome);
router.get('/', TomeControleur.getTomeManga);
router.get('/:id', TomeControleur.getTome);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.postTome);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.patchTome);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.deleteTome);


module.exports = router;
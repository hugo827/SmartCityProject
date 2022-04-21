const Router = require("express-promise-router");
const router = new Router;

const userDataControleur = require('../controleur/userData');

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");

router.get('/listownmanga', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, userDataControleur.getOwnListManga);
router.get('/manga', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, userDataControleur.getAllDataManga);

module.exports = router;
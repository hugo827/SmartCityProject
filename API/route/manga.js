const Router = require("express-promise-router");
const router = new Router;

const MangaControleur = require("../controleur/manga");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");



router.get('/', MangaControleur.getManga);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.postManga);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.patchManga);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.deleteManga);

module.exports = router;
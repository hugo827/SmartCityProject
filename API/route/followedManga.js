const Router = require("express-promise-router");
const router = new Router;

const FollowedMangaControleur = require("../controleur/followedManga");
const JWTMiddleWare = require('../middleware/identification');
const AuthoMiddleware = require('../middleware/authorization');



router.get('/nb', FollowedMangaControleur.getCountFollowedManga);
router.get('/all/:offset', FollowedMangaControleur.getAllFollowedManga);
router.get('/:id', FollowedMangaControleur.getFollowedManga);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.postFollowedManga);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.patchFollowedManga);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.deleteFollowedManga);

module.exports = router;
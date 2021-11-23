const FollowedMangaControleur = require("../controleur/followedManga");
const Router = require("express-promise-router");
const router = new Router;


router.get('/:id', FollowedMangaControleur.getFollowedManga);
router.post('/', FollowedMangaControleur.postFollowedManga);
router.patch('/', FollowedMangaControleur.patchFollowedManga);
router.delete('/', FollowedMangaControleur.deleteFollowedManga);

module.exports = router;
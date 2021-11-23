const MangaControleur = require("../controleur/manga");
const Router = require("express-promise-router");
const router = new Router;


router.get('/:id', MangaControleur.getManga);
router.post('/', MangaControleur.postManga);
router.patch('/', MangaControleur.patchManga);
router.delete('/', MangaControleur.deleteManga);

module.exports = router;
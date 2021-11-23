const ReadedTomeControleur = require("../controleur/readedTome");
const Router = require("express-promise-router");
const router = new Router;


router.get('/:id', ReadedTomeControleur.getReadedTome);
router.post('/', ReadedTomeControleur.postReadedTome);
router.patch('/', ReadedTomeControleur.patchReadedTome);
router.delete('/', ReadedTomeControleur.deleteReadedTome);

module.exports = router;
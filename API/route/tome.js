const TomeControleur = require("../controleur/tome");
const Router = require("express-promise-router");
const router = new Router;


router.get('/:id', TomeControleur.getTome);

router.post('/', TomeControleur.postTome);

router.patch('/', TomeControleur.patchTome);

router.delete('/', TomeControleur.deleteTome);

module.exports = router;
const Router = require("express-promise-router");
const router = new Router;

const TomeControleur = require("../controleur/tome");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");

const uploadImage = require("../middleware/UploadsImage");

/**
 * @swagger
 * /tome/nb:
 *  get:
 *      tags:
 *          - Tome
 *      description: Renvoie un string correspond au nombre d'occurrences dans la table
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Count'
 *          500:
 *              description: Erreur serveur
 */
router.get('/nb', TomeControleur.getCountTome);
/**
 * @swagger
 * /tome/all/{offset}:
 *  get:
 *      tags:
 *         - Tome
 *      description: Renvoie un objet contenant un ensemble d'objet de type account. La taille de l'objet renvoyé est limiter par la requête sql. (2 temporairement pour les tests)
 *      parameters:
 *          - name: offset
 *            description: Nombre permettant de séléctionner les occurences d'une table a partir de celui-ci
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TomeList'
 *          404:
 *              description: La liste des tomes n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/all/:offset', TomeControleur.getAllTome);
router.get('/', TomeControleur.getTomeManga);
router.get('/:id', TomeControleur.getTome);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.postTome);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.patchTome);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.deleteTome);


module.exports = router;
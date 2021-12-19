const Router = require("express-promise-router");
const router = new Router;

const ReadedTomeControleur = require("../controleur/readedTome");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");


/**
 * @swagger
 * /readedTome/nb:
 *  get:
 *      tags:
 *          - ReadedTome
 *      description: Renvoie un string correspond au nombre d'occurrences dans la table
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Count'
 *          500:
 *              description: Erreur serveur
 */
router.get('/nb', ReadedTomeControleur.getCountReadedTome);
/**
 * @swagger
 * /readedTome/all/{offset}:
 *  get:
 *      tags:
 *         - ReadedTome
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
 *              $ref: '#/components/responses/ReadedTomeList'
 *          404:
 *              description: La liste des tomes lu n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/all/:offset', ReadedTomeControleur.getAllReadedTome);
router.get('/:id', ReadedTomeControleur.getReadedTomeId);
router.get('/', ReadedTomeControleur.getReadedTome);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.postReadedTome);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.patchReadedTome);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.deleteReadedTome);

module.exports = router;
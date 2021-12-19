const Router = require("express-promise-router");
const router = new Router;

const FollowedMangaControleur = require("../controleur/followedManga");
const JWTMiddleWare = require('../middleware/identification');
const AuthoMiddleware = require('../middleware/authorization');


/**
 * @swagger
 * /followedManga/nb:
 *  get:
 *      tags:
 *          - FollowedManga
 *      description: Renvoie un string correspond au nombre d'occurrences dans la table
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Count'
 *          500:
 *              description: Erreur serveur
 */
router.get('/nb', FollowedMangaControleur.getCountFollowedManga);
/**
 * @swagger
 * /followedManga/all/{offset}:
 *  get:
 *      tags:
 *         - FollowedManga
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
 *              $ref: '#/components/responses/FollowedMangaList'
 *          404:
 *              description: La liste des mangas suvit n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/all/:offset', FollowedMangaControleur.getAllFollowedManga);
router.get('/:id', FollowedMangaControleur.getFollowedManga);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.postFollowedManga);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.patchFollowedManga);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.deleteFollowedManga);

module.exports = router;
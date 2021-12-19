const Router = require("express-promise-router");
const router = new Router;

const MangaControleur = require("../controleur/manga");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");

/**
 * @swagger
 * /manga/nb:
 *  get:
 *      tags:
 *          - Manga
 *      description: Renvoie un string correspond au nombre d'occurrences dans la table
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Count'
 *          500:
 *              description: Erreur serveur
 */
router.get('/nb', MangaControleur.getCountManga);
/**
 * @swagger
 * /manga/all/{offset}:
 *  get:
 *      tags:
 *         - Manga
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
 *              $ref: '#/components/responses/MangaList'
 *          404:
 *              description: La liste des mangas n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/all/:offset', MangaControleur.getAllManga);
router.get('/:id', MangaControleur.getManga);
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.postManga);
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.patchManga);
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.deleteManga);

module.exports = router;
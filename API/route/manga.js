const Router = require("express-promise-router");
const router = new Router;

const MangaControleur = require("../controleur/manga");

const JWTMiddleWare = require("../middleware/identification");
const AuthoMiddleware = require("../middleware/authorization");

const uploadImage = require("../middleware/UploadsImage");


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


router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, uploadImage.upload.fields( [
    {name: 'title', maxCount: 1 },
    {name: 'synopsis', maxCount: 1 },
    {name: 'new_price', maxCount: 1 },
    {name: 'type', maxCount: 1 },
    {name: 'sub_genre', maxCount: 1 },
    {name: 'author', maxCount: 1 },
    {name: 'publisher', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
    {name: 'is_finish', maxCount: 1 }
]), MangaControleur.postManga);

router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, uploadImage.upload.fields( [
    {name: 'id_manga', maxCount: 1},
    {name: 'title', maxCount: 1 },
    {name: 'synopsis', maxCount: 1 },
    {name: 'new_price', maxCount: 1 },
    {name: 'type', maxCount: 1 },
    {name: 'sub_genre', maxCount: 1 },
    {name: 'author', maxCount: 1 },
    {name: 'publisher', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
    {name: 'is_finish', maxCount: 1 }
]), MangaControleur.patchManga);

router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.deleteManga);


/**
 * @swagger
 * /manga/{id}:
 *  get:
 *      tags:
 *         - Manga
 *      description: Renvoie les infos du manga correspondant à l'id.
 *      parameters:
 *          - name: id
 *            description: ID d'un manga
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/MangaGet'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: Manga non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', MangaControleur.getManga);
module.exports = router;
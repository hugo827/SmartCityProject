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
 *      description: Renvoie un string correspondant au nombre d'occurrences dans la table
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
 *      description: Renvoie un objet contenant un ensemble d'objets du type account. La taille de l'objet renvoyé est limitée par la requête Sql. (2 temporairement pour les tests)
 *      parameters:
 *          - name: offset
 *            description: Nombre permettant de sélectionner les occurrences d'une table à partir de celui-ci
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
/**
 * @swagger
 * /manga/:
 *  post:
 *      tags:
 *          - Manga
 *      description: Permet la création d'un manga
 *      requestBody:
 *          description: Tous les attributs de la table sont passé dans le body pour l'ajout d'un manga.
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Manga'
 *      responses:
 *          201:
 *              description: Manga ajouté
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          402:
 *              description: (aussi 403) Une ou plusieurs données required ne sont pas défénis - Erreur imputable au client.
 *          500:
 *              description: Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, uploadImage.upload.fields( [
    {name: 'title', maxCount: 1 },
    {name: 'synopsis', maxCount: 1 },
    {name: 'new_price', maxCount: 1 },
    {name: 'type', maxCount: 1 },
    {name: 'sub_genre', maxCount: 1 },
    {name: 'author', maxCount: 1 },
    {name: 'publisher', maxCount: 1 },
    {name: 'is_finish', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
]), MangaControleur.postManga);
/**
 * @swagger
 * /manga/:
 *  patch:
 *      tags:
 *          - Manga
 *      description: Permet de faire une mise a jour d'un manga
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Toutes les données d'un manga sont passé dans le body pour la mise à jour du client ainsi que le token dans le headers.
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Manga'
 *      responses:
 *          204:
 *               description: Le manga a été mis à jour
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, uploadImage.upload.fields( [
    {name: 'id_manga', maxCount: 1},
    {name: 'title', maxCount: 1 },
    {name: 'synopsis', maxCount: 1 },
    {name: 'new_price', maxCount: 1 },
    {name: 'type', maxCount: 1 },
    {name: 'sub_genre', maxCount: 1 },
    {name: 'author', maxCount: 1 },
    {name: 'publisher', maxCount: 1 },
    {name: 'is_finish', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
]), MangaControleur.patchManga);
/**
 * @swagger
 * /manga/:
 *  delete:
 *      tags:
 *          - Manga
 *      description: Permet de supprimer un manga.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: L'id du manga est passé dans le body pour la suppression ainsi que le token dans le headers.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Delete'
 *      responses:
 *          204:
 *            $ref: '#/components/responses/Delete'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          404:
 *              $ref: '#/components/responses/DeleteFailed'
 *          500:
 *              description: Erreur serveur
 */
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, MangaControleur.deleteManga);



module.exports = router;
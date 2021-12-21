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
/**
 * @swagger
 * /followedManga/{id}:
 *  get:
 *      tags:
 *         - FollowedManga
 *      description: Renvoie les infos du manga suvit correspondant à l'id passé en parametre.
 *      parameters:
 *          - name: id
 *            description: ID d'un manga suivit
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/FollowedMangaGet'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: Manga non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', FollowedMangaControleur.getFollowedManga);
/**
 * @swagger
 * /followedManga/:
 *  post:
 *      tags:
 *          - FollowedManga
 *      description: Permet la création d'un manga suivit
 *      requestBody:
 *          description: Toutes les attribut de la table sont passé dans le body pour l'ajout d'un manga suivit.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FollowedManga'
 *      responses:
 *          201:
 *            description: Manga suivit ajouté
 *          400:
 *              description: Une ou plusieurs données required ne sont pas défénis - Erreur imputable au client.
 *          500:
 *              description: Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.postFollowedManga);
/**
 * @swagger
 * /followedManga/:
 *  patch:
 *      tags:
 *          - FollowedManga
 *      description: Permet de faire une mise a jour d'un manga suivit
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Toutes les données d'un manga suivit sont passé dans le body pour la mise à jour du client ainsi que le token dans le headers.
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/FollowedManga'
 *      responses:
 *          201:
 *               description: Le manga suivit a été mis à jour
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.patchFollowedManga);
/**
 * @swagger
 * /followedManga/:
 *  delete:
 *      tags:
 *          - FollowedManga
 *      description: Permet de supprimer un manga suivit
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: L'id du manga suivit est passé dans le body pour la suppression ainsi que le token dans le headers.
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
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner,  FollowedMangaControleur.deleteFollowedManga);

module.exports = router;
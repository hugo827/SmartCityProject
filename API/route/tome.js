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
/**
 * @swagger
 * /tome/:
 *  get:
 *      tags:
 *         - Tome
 *      description: Renvoie les informations d'un tome demande.
 *      requestBody:
 *          description: l'id d'un tome
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TomeList'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TomeGet'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: Manga non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/', TomeControleur.getTomeManga);
/**
 * @swagger
 * /tome/{id}:
 *  get:
 *      tags:
 *         - Tome
 *      description: Renvoie les infos du tome correspondant à l'id.
 *      parameters:
 *          - name: id
 *            description: ID d'un tome
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TomeGet'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: Manga non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', TomeControleur.getTome);
/**
 * @swagger
 * /tome/:
 *  post:
 *      tags:
 *          - Tome
 *      description: Permet la création d'un tome
 *      requestBody:
 *          description: Toutes les attribut de la table sont passé dans le body pour l'ajout d'un manga.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TomeList'
 *      responses:
 *          201:
 *            description: Tome ajouté
 *          400:
 *              description: Une ou plusieurs données required ne sont pas défénis - Erreur imputable au client.
 *          500:
 *              description: Erreur serveur
 */
router.post('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, uploadImage.upload.fields( [
    {name: 'number', maxCount: 1 },
    {name: 'title', maxCount: 1 },
    {name: 'release_date', maxCount: 1 },
    {name: 'is_last_tome', maxCount: 1 },
    {name: 'fk_manga', maxCount: 1 },
    {name: 'picture', maxCount: 1},
]), TomeControleur.postTome);
/**
 * @swagger
 * /tome/:
 *  patch:
 *      tags:
 *          - Tome
 *      description: Permet de faire une mise a jour d'un tome
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Toutes les données d'un tome sont passé dans le body pour la mise à jour du client ainsi que le token dans le headers.
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/TomeList'
 *      responses:
 *          201:
 *              description: Le tome a été mis à jour
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
    {name: 'id_tome', maxCount: 1 },
    {name: 'number', maxCount: 1 },
    {name: 'title', maxCount: 1 },
    {name: 'release_date', maxCount: 1 },
    {name: 'is_last_tome', maxCount: 1 },
    {name: 'fk_manga', maxCount: 1 },
    {name: 'picture', maxCount: 1},
]), TomeControleur.patchTome);
/**
 * @swagger
 * /tome/:
 *  delete:
 *      tags:
 *          - Tome
 *      description: Permet de supprimer un tome.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: L'id du tome est passé dans le body pour la suppression ainsi que le token dans le headers.
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
router.delete('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, TomeControleur.deleteTome);


module.exports = router;
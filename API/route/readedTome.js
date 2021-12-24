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
 *      description: Renvoie un tableau d'objet de type readed_tome. La taille du tableau renvoyé est limité par la requête sql. (2 temporairement pour les tests)
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
 *          400:
 *              description: L'offset passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: La liste des tomes lu n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 */
router.get('/all/:offset', ReadedTomeControleur.getAllReadedTome);
/**
 * @swagger
 * /readedTome/{id}:
 *  get:
 *      tags:
 *         - ReadedTome
 *      description: Renvoie un objet contenant toutes les informations d'un tome lu.
 *      parameters:
 *          - name: id
 *            description: id permettant de séléctionner un tome lu
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ReadedTome'
 *          404:
 *              description: Le tomes lu n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', ReadedTomeControleur.getReadedTomeId);
/**
 * @swagger
 * /readedTome/:
 *  get:
 *      tags:
 *         - ReadedTome
 *      description: Renvoie une liste d'objet contenant toutes les infos des tomes lu d'un manga suivit en particulier.
 *      requestBody:
 *          description: L'id de l'utilisateur et l'id du manga suivit
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReadedTomeByManga'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ReadedTomeList'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputables au client
 *          404:
 *              description: Les tomes lus n'ont pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/', ReadedTomeControleur.getReadedTome);
/**
 * @swagger
 * /readedTome/:
 *  post:
 *      tags:
 *          - ReadedTome
 *      description: Permet la création d'un tome lu
 *      requestBody:
 *          description: Tous les attributs de la table sont passé dans le body pour l'ajout d'un tome lu.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReadedTome'
 *      responses:
 *          201:
 *            description: Tome lu ajouté
 *          402:
 *              description: (code 400) Une ou plusieurs données required ne sont pas défénis - Erreur imputable au client.
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 */
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.postReadedTome);
/**
 * @swagger
 * /readedTome/:
 *  patch:
 *      tags:
 *          - ReadedTome
 *      description: Permet de faire une mise a jour d'un tome lu
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Toutes les données d'un tome lu sont passé dans le body pour la mise à jour du client ainsi que le token dans le headers.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReadedTome'
 *      responses:
 *          201:
 *              description: Le tome lu a été mis à jour
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.patchReadedTome);
/**
 * @swagger
 * /readedTome/:
 *  delete:
 *      tags:
 *          - ReadedTome
 *      description: Permet de supprimer un tome lu.
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: L'id du tome lu  est passé dans le body pour la suppression ainsi que le token dans le headers.
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
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, ReadedTomeControleur.deleteReadedTome);

module.exports = router;
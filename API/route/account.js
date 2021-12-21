const Router = require("express-promise-router");
const router = new Router();

const accountController = require('../controleur/account');
const inscription = require('../middleware/inscription');

const JWTMiddleWare = require('../middleware/identification');
const AuthoMiddleware = require("../middleware/authorization");

const uploadImage = require("../middleware/UploadsImage");

/**
 * @swagger
 * /account/nb:
 *  get:
 *      tags:
 *          - Account
 *      description: Renvoie un string correspond au nombre d'occurrences dans la table
 *      responses:
 *          200:
 *              $ref: '#/components/responses/Count'
 *          500:
 *              description: Erreur serveur
 */
router.get('/nb', accountController.getCountAccount);

/**
 * @swagger
 * /account/admin:
 *  get:
 *      tags:
 *          - Account
 *      description: Renvoie un objet.
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *            description: Renvoie un objet contenant un booléen admin
 *            content:
 *                text/plain:
 *                    schema:
 *                        type: object
 *                        properties:
 *                              admin:
 *                                  type: boolean
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeAdmin'
 *          500:
 *              description: Erreur serveur
 */
router.get('/admin', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, module.exports.result = (req, res) => {  res.json( {  "admin" : true});} );
/**
 * @swagger
 * /account/all/{offset}:
 *  get:
 *      tags:
 *         - Account
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
 *              $ref: '#/components/responses/AccountList'
 *          404:
 *              description: La liste des comptes n'a pas été trouvée
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/all/:offset', accountController.getAllAccount);

/**
 * @swagger
 * /account/{id}:
 *  get:
 *      tags:
 *         - Account
 *      description: Renvoie les infos de l'utilisateur correspondant à l'id.
 *      parameters:
 *          - name: id
 *            description: ID d'un account
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/AccountGet'
 *          400:
 *              description: L'id passé n'est pas un nombre - Erreur imputable à l'utilisateur.
 *          404:
 *              description: Account non trouvé
 *          500:
 *              description: Erreur serveur
 *
 */
router.get('/:id', accountController.getAccountId);

/**
 * @swagger
 * /account/login:
 *  post:
 *      tags:
 *          - Account
 *      description: Renvoie un JWT token permettant l'identification.
 *      requestBody:
 *          description: login et password pour la connexion
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *            description: un token JWT
 *            content:
 *                text/plain:
 *                    schema:
 *                        type: string
 *          400:
 *              description: Login ou password non définis - Erreur imputable au client
 *          404:
 *              description: Ressource demandée inexistante
 *          500:
 *              description: Erreur serveur
 */
router.post('/login', accountController.login);

/**
 * @swagger
 * /account/inscription:
 *  post:
 *      tags:
 *          - Account
 *      description: Permet l'inscription d'une personne en verifiant les données passées dans le body
 *      requestBody:
 *          description: Toutes les attribut de la table sont passé dans le body pour l'inscription. Admin sera toujours a false. Seul un administrateur peut ajouter un nouveau administrateur.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Inscription'
 *      responses:
 *          201:
 *            description: Inscription réussi
 *          400:
 *              description: Une ou plusieurs données required ne sont pas défénis - Erreur imputable au client.
 *          403:
 *              description: Le login d'inscription existe déjà.
 *              content:
 *               text/plain:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifAccount'
 *          500:
 *              description: Erreur serveur
 */
router.post('/inscription', uploadImage.upload.fields( [
    {name: 'login', maxCount: 1 },
    {name: 'pswd', maxCount: 1 },
    {name: 'email', maxCount: 1 },
    {name: 'birthdate', maxCount: 1 },
    {name: 'phone', maxCount: 1 },
    {name: 'is_admin', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
]), inscription.verifAccount, accountController.inscription);

/**
 * @swagger
 * /account/:
 *  patch:
 *      tags:
 *          - Account
 *      description: Permet de faire une mise a jour d'un compte
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: Toutes les données d'un utilisateur -> id, login, password, email, ... sont passé dans le body pour la mise à jour du client ainsi que le token dans le headers.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Account'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/AccountUpdate'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeOwner'
 *          500:
 *              description: Erreur serveur
 */
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, uploadImage.upload.fields( [
    {name: 'id_user', maxCount: 1 },
    {name: 'login', maxCount: 1 },
    {name: 'pswd', maxCount: 1 },
    {name: 'email', maxCount: 1 },
    {name: 'birthdate', maxCount: 1 },
    {name: 'phone', maxCount: 1 },
    {name: 'is_admin', maxCount: 1 },
    {name: 'picture', maxCount: 1 },
]), accountController.patchAccount);

/**
 * @swagger
 * /account/:
 *  delete:
 *      tags:
 *          - Account
 *      description: Permet de supprimer un compte
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          description: L'id du compte est passé dans le body pour la suppression ainsi que le token dans le headers.
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
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeOwner, accountController.deleteAccount);

module.exports =  router;
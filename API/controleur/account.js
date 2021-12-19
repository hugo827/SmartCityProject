require("dotenv").config();

const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../scripts/JS/database');

const account = require('../modele/login');
const AccountMod = require('../modele/account');
const readedTome = require('../modele/readedTome');
const followedManga = require('../modele/followedManga');

/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              login:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
 *          required:
 *              - login
 *              - password
 */
module.exports.login = async (req, res) => {

    const {login, password} = req.body;

    if(login === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await account.checkConnection(client, login, password);

            const {userType, value} = result;
            if (userType === "inconnu") {
                res.sendStatus(404);
            } else if (userType === "admin") {
                const {id_account, login} = value;
                const payload = {status: userType, value: {id_account, login}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);

            } else {
                const {id_account, login} = value;
                const payload = {status: userType, value: {id_account, login}};
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};

/**
 * @swagger
 * components:
 *  schemas:
 *      Inscription:
 *          type: object
 *          properties:
 *              login:
 *                  type: string
 *              pswd:
 *                  type: string
 *                  format: password
 *              email:
 *                  type: string
 *              birthdate:
 *                  type: object
 *                  format: date
 *              phone:
 *                  type: string
 *              picture:
 *                  type: object
 *                  format: image
 *              is_admin:
 *                  type: boolean
 *          required:
 *              - login
 *              - pswd
 *              - email
 */
module.exports.inscription = async (req, res) => {
    const {login, pswd, email, birthdate, phone, picture, is_admin} = req.body;

    if(login === undefined || pswd === undefined || email === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await AccountMod.createAccount(client, login, pswd, email, birthdate, phone, null, is_admin);
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};


/**
 * @swagger
 *  components:
 *      responses:
 *          AccountList:
 *              description:  renvoie la liste des comptes à partir du offset (limiter a n)
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/AccountList'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      AccountList:
 *          type: object
 *          properties:
 *              id_user:
 *                  type: integer
 *              login:
 *                  type: string
 *              pswd:
 *                  type: string
 *                  format: text
 *              email:
 *                  type: string
 *              birthdate:
 *                  type: object
 *                  format: date
 *              phone:
 *                  type: number
 *              picture:
 *                  type: object
 *                  format: image
 *              is_admin:
 *                  type: boolean
 */
module.exports.getAllAccount = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: Mangas} = await AccountMod.getAllAccount(client, offset);
        if(Mangas !== undefined){
            res.json(Mangas);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 *  components:
 *      responses:
 *          AccountCount:
 *              description: Le nombre de comptes utilisateur dans la table
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/AccountCount'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      AccountCount:
 *          type: string
 */
module.exports.getCountAccount = async (req, res) => {
    const client = await pool.connect();
    try {
        const nb = await AccountMod.getCountAccount(client);
        res.json(nb);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


/**
 * @swagger
 *  components:
 *      responses:
 *          AccountGet:
 *              description: Le compte a été trouvé
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      Account:
 *          type: object
 *          properties:
 *              id_user:
 *                  type: integer
 *              login:
 *                  type: string
 *              pswd:
 *                  type: string
 *                  format: text
 *              email:
 *                  type: string
 *              birthdate:
 *                  type: object
 *                  format: date
 *              phone:
 *                  type: number
 *              picture:
 *                  type: object
 *                  format: image
 *              is_admin:
 *                  type: boolean
 */
module.exports.getAccountId = async (req, res) =>  {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: Users} = await AccountMod.getAccountId(client, id);
            const user = Users[0];
            if(user !== undefined){
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

/**
 * @swagger
 *  components:
 *      responses:
 *          AccountUpdate:
 *              description: Le compte a été mis à jour
 */
module.exports.patchAccount = async (req, res) => {
    if(req.session) {
        const {id_user, login, pswd, email, birthdate, phone, picture, is_admin} = req.body;
        const client = await pool.connect();
        try{
            await AccountMod.patchAccount(id_user, login, pswd, email, birthdate, phone, picture, is_admin, client);
            res.sendStatus(204);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }

};

/**
 * @swagger
 *  components:
 *      responses:
 *          AccountDelete:
 *              description: Le compte a été supprimer
 */

/**
 * @swagger
 *  components:
 *      responses:
 *          AccountDeleteFailed:
 *              description: Une erreur est survenue lors de la supression du comptes
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/AccountDeleteFailed'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      AccountDelete:
 *          type: object
 *          properties:
 *              id_user:
 *                  type: integer
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      AccountDeleteFailed:
 *          type: object
 *          properties:
 *              error:
 *                  type: string
 */
module.exports.deleteAccount = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await client.query("BEGIN;");
            const resDelReadTome = await readedTome.deleteUserReadedTome(id, client);
            if(resDelReadTome.rowCount !== 1) {
                const resDelFollowedManga = await followedManga.deleteUserFollowedManga(id, client);
                if(resDelFollowedManga.rowCount !== 1) {
                    const resDelAccount = await AccountMod.deleteAccount(id, client);
                    if(resDelAccount.rowCount !== 1) {
                        await client.query("COMMIT")
                        res.sendStatus(204);
                    } else {
                        await client.query("ROLLBACK");
                        res.status(404).json({error: "Un problème est survenue lors de la suppression du compte"});
                    }
                } else {
                    await client.query("ROLLBACK");
                    res.status(404).json({error: "Un problème est survenue lors de la suppression des mangas suivit !"});
                }
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "Un problème est survenue lors de la suppression des tomes lu !"});
            }
        } catch (error){
            await client.query("ROLLBACK");
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }

};
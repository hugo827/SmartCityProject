require("dotenv").config();

const process = require('process');
const jwt = require('jsonwebtoken');
const pool = require('../scripts/JS/database');
const {Buffer} = require("buffer");

const account = require('../modele/login');
const AccountMod = require('../modele/account');
const FollowedManga = require('../modele/followedManga');
const ReadedTome = require("../modele/readedTome");


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
                const {id_user, login} = value;
                const payload = {status: userType, value: {id_user, login} };
                const token = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN,
                    {expiresIn: '1d'}
                );
                res.json(token);

            } else {
                const {id_user, login} = value;
                const payload = {status: userType, value: {id_user, login}};
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
 *              - birthdate
 *              - phone
 *              - picture
 */
module.exports.inscription = async (req, res) => {
    const {login, pswd, email, birthdate, phone, is_admin} = req.body;

    let pictureHexX = null;
    if(req.files.picture !== undefined ) {
        const picture = req.files.picture[0];
        const pictureHex = picture.buffer.toString('hex');
        pictureHexX = '\\x' + pictureHex;
    }

    if(login === undefined || pswd === undefined || email === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await AccountMod.createAccount(client, login, pswd, email, birthdate, phone, pictureHexX, is_admin);
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
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id_user:
 *                      type: integer
 *                  login:
 *                      type: string
 *                  pswd:
 *                      type: string
 *                      format: text
 *                  email:
 *                      type: string
 *                  birthdate:
 *                      type: object
 *                      format: date
 *                  phone:
 *                      type: number
 *                  picture:
 *                      type: string
 *                      format: base64
 *                  is_admin:
 *                      type: boolean
 */
module.exports.getAllAccount = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: accounts} = await AccountMod.getAllAccount(client, offset);

        for(let i in accounts) {
            if(accounts[i].picture !== null) {
                let base64 = Buffer.from(accounts[i].picture, 'hex').toString('base64');
                accounts[i].picture = base64;
            }
            if(accounts[i].birthdate !== null) {
                let year = accounts[i].birthdate.getFullYear();
                let month = accounts[i].birthdate.getMonth();
                let day = accounts[i].birthdate.getDay();
                let dateString = `${day}/${month}/${year}`;
                accounts[i].birthdate = dateString;
            }
        }

        if(accounts !== undefined){
            res.json(accounts);
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
 *          Count:
 *              description: Le nombre d'enregistrements dans la table
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Count'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      Count:
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
 *          required:
 *              - id_user
 *              - login
 *              - email
 *              - birthdate
 *              - phone
 *              - picture
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

            if(user.picture !== null) {
                let base64 = Buffer.from(user.picture, 'hex').toString('base64');
                user.picture = base64;
            }
            if(user.birthdate !== null) {
                let year = user.birthdate.getFullYear();
                let month = user.birthdate.getMonth() +1;
                let day = user.birthdate.getDay();
                month = month <= 9 ? `0${month}` : month;
                day = day <= 9 ? `0${day}` : day;
                let dateString = `${year}-${month}-${day}`;
                user.birthdate = dateString;
            }

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
 *          Update:
 *              description: La mise a jour a correctement été effectué
 */
module.exports.patchAccount = async (req, res) => {
    if(req.session) {
        const {id_user, login, pswd, email, birthdate, phone, is_admin} = req.body;

        const picture = req.files.picture[0];
        const pictureHex = picture.buffer.toString('hex');
        const pictureHexX = '\\x' + pictureHex;

        const client = await pool.connect();
        try{
            await AccountMod.patchAccount(id_user, login, pswd, email, birthdate, phone, pictureHexX, is_admin, client);
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
 *          Delete:
 *              description: La suppression a correctement été effectuée
 */

/**
 * @swagger
 *  components:
 *      responses:
 *          DeleteFailed:
 *              description: Une erreur est survenue lors de la supression
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#/components/schemas/DeleteFailed'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Delete:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      DeleteFailed:
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
            let promises = [];
            const {rows : readedTomes} =  await ReadedTome.getReadedTomeUser(id, client);

            if(readedTomes !== undefined && readedTomes.length !== 0) {
                promises.push(await ReadedTome.deleteUserReadedTome(id, client));
            }

            const {rows: folMangas} =  await FollowedManga.getFollowedMangaByFKUSER(id, client);

            if(folMangas !== undefined && folMangas.length !== 0) {
                promises.push(await FollowedManga.deleteUserFollowedManga(id, client));
            }
            promises.push(await AccountMod.deleteAccount(id, client));

            const response = await Promise.all(promises);
            let i = 0;
            let isDelete = true;

            while(i < response.length && isDelete) {
                if (response[i].rowCount === 0) isDelete = false;
                i++;
            }

            if(isDelete) {
                await client.query("COMMIT")
                res.sendStatus(204);
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "Un problème est survenue lors de la suppression d'un compte!"});
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


module.exports.getMyAccount = async (req, res) => {
    const client = await pool.connect();
    const {id_user, login, authLevel } = req.session;
    const id = parseInt(id_user);

    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: Users} = await AccountMod.getAccountId(client, id);
            const user = Users[0];

            if(user.picture !== null) {
                let base64 = Buffer.from(user.picture, 'hex').toString('base64');
                user.picture = base64;
            }
            if(user.birthdate !== null) {
                let year = user.birthdate.getFullYear();
                let month = user.birthdate.getMonth() +1;
                let day = user.birthdate.getDay();
                month = month <= 9 ? `0${month}` : month;
                day = day <= 9 ? `0${day}` : day;
                let dateString = `${year}-${month}-${day}`;
                user.birthdate = dateString;
            } else {
                user.birthdate = "So bad no birthdate";
            }

            let userInformation = { login: user.login, phone: user.phone, email: user.email, birthdate: user.birthdate }

            if(userInformation !== undefined){
                res.json(userInformation);
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
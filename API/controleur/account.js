require("dotenv").config();

const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../scripts/JS/database');

const account = require('../modele/login');

const AccountMod = require('../modele/account');
const readedTome = require('../modele/readedTome');
const followedManga = require('../modele/followedManga');


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


module.exports.deleteAccount = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await client.query("BEGIN;");
            const resDelReadTome = await readedTome.deleteUserReadedTome(id, client);
            if(resDelReadTome) {
                const resDelFollowedManga = await followedManga.deleteUserFollowedManga(id, client);
                if(resDelFollowedManga) {
                    const resDelAccount = await AccountMod.deleteAccount(id, client);
                    if(resDelAccount) {
                        await client.query("COMMIT")
                        res.sendStatus(204);
                    } else {
                        await client.query("ROLLBACK");
                        res.status(404).json({error: "Un problème est survenue de la suppression du comptes"});
                    }
                } else {
                    await client.query("ROLLBACK");
                    res.status(404).json({error: "Un problème est survenue de la suppression des mangas suivit !"});
                }
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "Un problème est survenue de la suppression des tomes lu !"});
            }
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
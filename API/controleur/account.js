require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../scripts/JS/database');
const account = require('../modele/account');

module.exports.login = async (req, res) => {
    const {login, pswd} = req.body;
    if(login === undefined || pswd === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const {rows: account} = await account.getAccount(client, login, pswd);
            if (!account.isAdmin) {
                /* envoie normal
                * avec expiresIn 3 month
                * sans canConnect react ?
                * */
            } else {
                const {id, nom} = value;
                const payload = {status: userType, value: {id, nom}};
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
    const login = req.body.login;
    const pswd = req.body.pswd;
    const email = req.body.email;
    const birthdate = req.body.birthdate;
    const phone  =  req.body.phone;
    /* profile picture ??? */
    if(login === undefined || pswd === undefined || email === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await account.createAccount(client, login, pswd, email, birthdate,phone, null);
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};
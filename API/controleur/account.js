require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../scripts/JS/database');
const account = require('../modele/login');
const Account = require('../modele/account');



module.exports.login = async (req, res) => {

    const {login, password} = req.body;
    console.log(login, password);
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
            await Account.createAccount(client, login, pswd, email, birthdate,phone, null);
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
    try{
        const {rows: Mangas} = await Account.getAllAccount(client);
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
        const nbAccount = await Account.getCountAccount(client);
        res.json(nbAccount);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
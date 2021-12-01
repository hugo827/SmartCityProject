require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../scripts/JS/database');
const account = require('../modele/login');


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
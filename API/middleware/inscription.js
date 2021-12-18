require('dotenv').config();
const process = require('process');
const account = require('../modele/account');
const pool = require('../scripts/JS/database');

module.exports.verifAccount = async (req, res, next) => {

    const {login, pswd, email} = req.body;

    if(login === undefined || pswd === undefined || email === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            if(await account.accountExist(client, login)) {
                res.json({'exist': true});
            } else {
                res.sendStatus(204)
                next();
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
};
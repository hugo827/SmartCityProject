require('dotenv').config();
const process = require('process');
const account = require('../modele/account');
const pool = require('../scripts/JS/database');

module.exports.verifAccount = async (req, res, next) => {

    const login = req.body.login;
    const pswd = req.body.pswd;
    const email = req.body.email;
    const birthdate = req.body.birthdate;
    const phone  =  req.body.phone;
    /* profile picture ??? */

    if(login === undefined || pswd === undefined || email === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            if(await account.accountExist(client, login)) {
                res.json({'login': login});
            } else {
                res.sendStatus(404)
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
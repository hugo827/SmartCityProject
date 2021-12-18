const {getHash} = require('../utils/utils');

module.exports.createAccount = async (client, login, pswd, email, birthdate, phone, picture, is_admin) => {
    const pswdHash = await getHash(pswd);
    return await client.query(`
        INSERT INTO account(login, pswd, email, birthdate, phone, picture, is_admin) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, [login, pswdHash , email, birthdate, phone, picture, is_admin]
    );
}

module.exports.getAccount = async (client, login) => {
    return await client.query(
        "SELECT * FROM account WHERE login = $1", [login] );
}

module.exports.getAllAccount = async (client, nb) => {
    return await client.query("SELECT * FROM account LIMIT 2 OFFSET $1", [nb]);
}

module.exports.getAccountId = async (client, id) => {
    return await client.query("SELECT * FROM account WHERE id_user = $1", [id] );
}


module.exports.accountExist = async (client, login) => {
    const {rows} = await client.query("SELECT count(id_user) FROM account WHERE login = $1", [login]);
    return rows[0].count > 0;
}

module.exports.getCountAccount = async (client) => {
    const {rows} = await client.query("SELECT COUNT(id_user) FROM account");
    return rows[0].count;
}

module.exports.patchAccount = async (id, login, pswd, email, birthdate, phone, picture, is_admin, client) => {
    return await client.query("UPDATE account SET login = $1, pswd = $2, email = $3, birthdate = $4, phone = $5, picture = $6, is_admin = $7 WHERE id_user = $8", [login, pswd, email, birthdate, phone, picture, is_admin, id]);
}

module.exports.deleteAccount = async (id, client) => {
    return await client.query("DELETE FROM account WHERE id_user = $1", [id] );
}
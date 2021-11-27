const {getHash} = require("../utils/utils");

module.exports.createAccount = async (client, login, pswd, email, birthdate, phone, profile_picture) => {
    return await client.query(`
        INSERT INTO account(login, pswd, email, birthdate, phone, profile_picture) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [login, await getHash(pswd), email, birthdate, phone, profile_picture]
    );
};

module.exports.getAccount = async (client, login) => {
    return await client.query(`
        SELECT * FROM account WHERE login = $1;
    `, [login]);
};

module.exports.accountExist = async (client, login) => {
    const {rows} = await client.query(
        "SELECT count(id) AS nbr FROM account WHERE login = $1",
        [login]
    );
    return rows[0].nbr > 0;
};

module.exports.checkConnection = async (client, login, pswd) => {
    /*
    const promises = [];
    const promiseClient = getClient(client, email);
    const promiseManager = getManager(client, email);
    promises.push(promiseClient, promiseManager);
    const values = await Promise.all(promises);
    const clientRow = values[0].rows[0];
    const managerRow = values[1].rows[0];
    if(clientRow !== undefined && await compareHash(password, clientRow.password)){
        return {userType: "client", value: clientRow};
    } else if (managerRow !== undefined && await compareHash(password, managerRow.password)){
        return {userType: "manager", value: managerRow};
    } else {
        return {userType: "inconnu", value: null}
    }
    */

}
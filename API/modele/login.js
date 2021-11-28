const {compareHash} = require("../utils/utils");
const {getAccount} = require("./account");

module.exports.checkConnection = async (client, loginArg, password) => {

    const promiseClient = getAccount(client, loginArg);
    const values = await Promise.resolve(promiseClient);
    const clientRow = values.rows[0];

    if(clientRow !== undefined   && await compareHash(password, clientRow.pswd) ) {
        return {userType: (clientRow.is_admin ? "admin" : "client") , value: clientRow};
    } else {
        return {userType: "inconnu", value: null}
    }
}
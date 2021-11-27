const {compareHash, getHash} = require("../utils/utils");
const {getAccount} = require("./account");

module.exports.checkConnection = async (client, loginArg, password) => {

    const promises = [];
    const promiseClient = getAccount(client, loginArg);
    promises.push(promiseClient);
    const values = await Promise.all(promises);
    const clientRow = values[0].rows[0];
    const passwordHash = getHash(password);
    if(clientRow !== undefined   && await compareHash(password, clientRow.pswd) ) {
        console.log(clientRow.is_Admin);
        return {userType: (clientRow.is_Admin ? "admin" : "client") , value: clientRow};
    } else {
        return {userType: "inconnu", value: null}
    }
}
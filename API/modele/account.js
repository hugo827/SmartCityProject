module.exports.createAccount = async (client, login, pswd, email, birthdate, phone, profile_picture) => {
    return await client.query(`
        INSERT INTO account(login, pswd, email, birthdate, phone, profile_picture) 
        VALUES ($1, $2, $3, $4, $5, $6)`, [login, await getHash(pswd), email, birthdate, phone, profile_picture]
    );
}

module.exports.getAccount = async (client, login) => {
    return await client.query(
        "SELECT * FROM account WHERE login = $1", [login] );
}

module.exports.getAllAccount = async (client) => {
    return await client.query("SELECT * FROM account ");
}


module.exports.accountExist = async (client, login) => {
    const {rows} = await client.query(
        "SELECT count(id) FROM account WHERE login = $1",
        [login]
    );
    return rows[0].count > 0;
}

module.exports.getCountAccount = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM account")
    return rows[0].count;
}
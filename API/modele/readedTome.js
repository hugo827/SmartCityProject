module.exports.getReadedTome = async (fk_manga, fk_user, client) => {
    return await client.query("SELECT * FROM readed_tome WHERE fk_manga = $1 AND fk_user = $2", [fk_manga,fk_user]);
}
module.exports.getAllReadedTome = async (client) => {
    return await client.query("SELECT * FROM readed_tome ");
}

module.exports.postReadedTome = async (read_at, fk_followed_manga, fk_user, fk_tome, client) => {
    return await client.query("INSERT INTO readed_tome(read_at, fk_followed_manga, fk_user, fk_tome) VALUES ($1, $2, $3, $4)", [read_at, fk_followed_manga, fk_user, fk_tome]);
}

module.exports.patchReadedTome = async (id, read_at, client) => {
    return await client.query("UPDATE readed_tome SET read_at = $1 WHERE id = $2", [read_at, id]);
}

module.exports.deleteReadedTome = async (id, client) => {
    return await client.query("DELETE FROM readed_tome WHERE id = $1", [id]);
}
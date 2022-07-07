module.exports.getReadedTome = async (fk_manga, fk_user, client) => {
    return await client.query("SELECT * FROM readed_tome WHERE fk_followed_manga = $1 AND fk_user = $2", [fk_manga,fk_user]);
}
module.exports.getAllReadedTome = async (client, nb) => {
    return await client.query("SELECT * FROM readed_tome LIMIT 2 OFFSET $1", [nb]);
}

module.exports.postReadedTome = async (read_at, fk_followed_manga, fk_user, fk_tome, client) => {
    return await client.query("INSERT INTO readed_tome(read_at, fk_followed_manga, fk_user, fk_tome) VALUES ($1, $2, $3, $4)", [read_at, fk_followed_manga,fk_user, fk_tome]);
}

module.exports.patchReadedTome = async (id, read_at, fk_followed_manga, fk_user, fk_tome, client) => {
    return await client.query("UPDATE readed_tome SET read_at = $1, fk_followed_manga = $2, fk_user = $3, fk_tome = $4 WHERE id_readed_tome = $5", [read_at, fk_followed_manga, fk_user, fk_tome, id]);
}

module.exports.deleteReadedTome = async (id, client) => {
    return await client.query("DELETE FROM readed_tome WHERE id_readed_tome = $1", [id]);
}

module.exports.getCountReadedTome = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM readed_tome");
    return rows[0].count;
}

module.exports.getReadedTomeID = async (id, client) => {
    return await client.query("SELECT * FROM readed_tome WHERE id_readed_tome = $1", [id]);
}

module.exports.deleteUserReadedTome = async (fK_user, client) => {
    return await client.query("DELETE FROM readed_tome WHERE fk_user = $1", [fK_user]);
}

module.exports.deleteFollowedMangaTome = async (fk_followed_manga, client) => {
    return await client.query("DELETE FROM readed_tome  WHERE fk_followed_manga = $1", [fk_followed_manga]);
}

module.exports.getReadedTomeUser = async (id, client) => {
    return await  client.query('SELECT * FROM readed_tome WHERE fk_user = $1', [id]);
}
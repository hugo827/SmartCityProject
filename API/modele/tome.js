module.exports.getTomeManga = async (id, client) => {
    return await client.query("SELECT * FROM tome WHERE fk_manga = $1", [id]);
}

module.exports.getTome = async (id, client) => {
    return await client.query("SELECT * FROM tome WHERE id_tome = $1", [id]);
}

module.exports.getAllTome = async (client, nb) => {
    return await client.query("SELECT * FROM tome LIMIT 2 OFFSET $1", [nb]);
}

module.exports.postTome = async (number, title, picture, release_date,is_last_tome, fk_manga, client) => {
    return await client.query("INSERT INTO tome(number, title, picture, release_date,is_last_tome, fk_manga) VALUES ($1, $2, $3, $4, $5, $6)", [number, title, picture, release_date, is_last_tome, fk_manga]);
}

module.exports.patchTome = async (id, number, title, picture,release_date, is_last_tome, fk_manga, client) => {
    return await client.query("UPDATE tome SET number = $1, title = $2, picture = $3, release_date = $4, is_last_tome = $5, fk_manga = $6 WHERE id_tome = $7", [number, title, picture,release_date, is_last_tome, fk_manga, id]);
}

module.exports.deleteTome = async (id, client) => {
    return await client.query("DELETE FROM tome WHERE id_tome = $1", [id]);
}

module.exports.deleteTomeManga = async (id, client) => {
    return await client.query("DELETE FROM tome WHERE fk_manga = $1", [id]);
}

module.exports.getCountTome = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM tome");
    return rows[0].count;
}
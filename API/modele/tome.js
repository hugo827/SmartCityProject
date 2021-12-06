module.exports.getTome = async (id, client) => {
    return await client.query("SELECT * FROM tome WHERE fk_manga = $1", [id]);
}

module.exports.getAllTome = async (client, nb) => {
    return await client.query("SELECT * FROM tome LIMIT 2 OFFSET $1", [nb]);
}


module.exports.postTome = async (number, title, picture, release_date, fk_manga, client) => {
    return await client.query("INSERT INTO tome(number, title, picture, release_date, fk_manga) VALUES ($1, $2, $3, $4, $5)", [number, title, picture, release_date, fk_manga]);
}

module.exports.patchTome = async (id, number, title, picture, client) => {
    return await client.query("UPDATE tome SET number = $1, title = $2, picture = $3 WHERE id = $4", [number, title, picture, id]);
}

module.exports.deleteTome = async (id, client) => {
    return await client.query("DELETE FROM tome WHERE id = $1", [id]);
}

module.exports.getCountTome = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM tome");
    return rows[0].count;
}
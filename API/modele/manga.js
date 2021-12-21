module.exports.getManga = async (id, client) => {
    return await client.query("SELECT * FROM manga WHERE id_manga = $1", [id]);
}
module.exports.getAllManga = async (client, nb) => {
    return await client.query("SELECT * FROM manga LIMIT 2 OFFSET $1", [nb]);
}

module.exports.postManga = async (title, synopsis, new_price, type, sub_genre, author, publisher, picture, is_finish, client) => {
    return await client.query("INSERT INTO manga(title, synopsis, new_price, type, sub_genre, author, publisher, picture, is_finish) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)", [title, synopsis, new_price, type, sub_genre, author, publisher, picture, is_finish]);
}

module.exports.patchManga = async (id, title, synopsis, new_price, type, sub_genre, author, publisher, picture, is_finish, client) => {
    return await client.query("UPDATE manga SET title = $1, synopsis = $2, new_price = $3, type = $4, sub_genre = $5, author = $6, publisher = $7, picture = $8, is_finish = $9 WHERE id_manga = $10", [title, synopsis, new_price, type, sub_genre, author, publisher, picture, is_finish,id]);
}

module.exports.deleteManga = async (id, client) => {
    return await client.query("DELETE FROM manga WHERE id_manga = $1", [id]);
}

module.exports.getCountManga = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM manga");
    return rows[0].count;
}
module.exports.getFollowedManga = async (id, client) => {
    return await client.query("SELECT * FROM followed_manga WHERE id_followed_manga = $1", [id]);
}

module.exports.getListFollowedManga = async (id, client) => {
    return await client.query("Select id_manga, id_followed_manga, title from manga inner join followed_manga fm on manga.id_manga = fm.fk_manga Where fm.fk_user = $1", [id]);
}

module.exports.getAllFollowedManga = async (client, nb) => {
    return await client.query("SELECT * FROM followed_manga LIMIT 2 OFFSET $1", [nb]);
}

module.exports.postFollowedManga = async (state,fk_manga,fk_user, client) => {
    return await client.query("INSERT INTO followed_manga(state, fk_manga, fk_user) VALUES ($1, $2, $3)", [state,fk_manga,fk_user]);
}

module.exports.patchFollowedManga = async (id_followed_manga, state, fk_user,fk_manga, client) => {
    return await client.query("UPDATE followed_manga SET state = $1, fk_user = $2, fk_manga = $3 WHERE id_followed_manga = $4", [state, fk_user, fk_manga, id_followed_manga]);
}

module.exports.deleteFollowedManga = async (id_followed_manga, client) => {
    return await client.query("DELETE FROM followed_manga WHERE id_followed_manga = $1", [id_followed_manga]);
}

module.exports.deleteFollowedMangaIDManga = async (id_manga, client) => {
    return await client.query("DELETE FROM followed_manga WHERE fk_manga = $1", [id_manga]);
}

module.exports.getCountFollowedManga = async (client) => {
    const {rows} = await client.query("SELECT COUNT(*) FROM followed_manga");
    return rows[0].count;
}

module.exports.deleteUserFollowedManga = async (fk_user, client) => {
    return await client.query("DELETE FROM followed_manga WHERE fk_user = $1", [fk_user]);
}

module.exports.getFollowedMangaByIdManga = async (fk_manga, client) =>  {
    return await client.query("SELECT id_followed_manga FROM followed_manga WHERE fk_manga = $1", [fk_manga]);
}

module.exports.getFollowedMangaByUSER = async (id, client) =>  {
    const {rows} = await client.query("SELECT COUNT(*) FROM followed_manga WHERE fk_user = $1", [id]);
    return rows[0].count;
}

module.exports.getFollowedMangaByFKUSER = async (id, client) =>  {
    return await client.query("SELECT * FROM followed_manga WHERE fk_user = $1", [id]);
}

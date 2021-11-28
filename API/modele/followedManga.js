module.exports.getFollowedManga = async (id, client) => {
    return await client.query("SELECT * FROM followed_manga WHERE fk_user = $1", [id]);
}

module.exports.postFollowedManga = async (state,fk_manga,fk_user, client) => {
    return await client.query("INSERT INTO followed_manga(state, fk_manga, fk_user) VALUES ($1, $2, $3)", [state,fk_manga,fk_user]);
}

module.exports.patchFollowedManga = async (id_followed_manga, state, client) => {
    return await client.query("UPDATE followed_manga SET state = $1 WHERE id_followed_manga = $2", [state,id_followed_manga]);
}

module.exports.deleteFollowedManga = async (id_followed_manga, client) => {
    return await client.query("DELETE FROM followed_manga WHERE id_followed_manga = $1", [id_followed_manga]); /* transaction a faire pour supprimer tous les tomes lu dans readed_tome */
}
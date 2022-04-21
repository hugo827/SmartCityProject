const pool = require('../scripts/JS/database');
const FollowedMangaMod = require('../modele/followedManga');
const MangaMod = require('../modele/manga');
const TomeMod = require('../modele/tome');
const ReadedTomeMod = require('../modele/readedTome');

module.exports.getOwnListManga = async (req, res) => {
    const client = await pool.connect();
    const {id_user} = req.session;
    const id = parseInt(id_user);

    try {
        if(isNaN(id)) {
            res.sendStatus(400);
        } else {
            const {rows: listMangas} =  await  FollowedMangaMod.getListFollowedManga(id, client);
            if(listMangas !== undefined ) {
                res.json(listMangas);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}


module.exports.getAllDataManga = async (req, res) => {
    const client = await pool.connect();
    const {id_manga} = req.body;
    const {id_user} = req.session;
    const idUser = parseInt(id_user);
    const idManga = parseInt(id_manga);

    try {
        if(isNaN(idUser) || isNaN(idManga)) {
            res.sendStatus(400);
        } else {
            // TODO : code pour récuper les informations d'un manga pour le mobile et le renvoyer. (Manga, si followed par l'utilisateur, listTome, listTome followed)
            const {rows: manga} = MangaMod.getManga(idManga, client);
            const {rows: tomes} = TomeMod.getTomeManga(idManga, client);
            const {rows: followedManga} = FollowedMangaMod.getFmByFkUserFkManga(id_user, idManga, client);
            const {rows: readedTomes} = ReadedTomeMod.getReadedTome(idManga, idUser, client);

            console.log(manga);
            console.log(tomes);
            console.log(followedManga);
            console.log(readedTomes);

        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}
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
            //Transaction ?
            const {rows: manga} = await MangaMod.getManga(idManga, client);
            const {rows: tomes} = await TomeMod.getTomeManga(idManga, client);
            const {rows: followedManga} = await FollowedMangaMod.getFmByFkUserFkManga(idUser, idManga, client);
            const {rows: readedTomes} = await ReadedTomeMod.getReadedTome(idManga, idUser, client);

            let allDataManga = manga[0];

            for(let i = 0; i < readedTomes.length; i++) {
                tomes[i].id_readed_tome = readedTomes[i]["id_readed_tome"];
                tomes[i].read_at = readedTomes[i]["read_at"];
            }
            allDataManga['tomes'] = tomes;
            allDataManga.state = followedManga[0]['state'];
            allDataManga.fk_user = followedManga[0]['fk_user'];
            allDataManga.id_followed_manga = followedManga[0]['id_followed_manga'];


            res.json(allDataManga);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }

}

module.exports.getListMangaByInput = async (req, res) => {

    const client = await pool.connect();
    const {input} = req.body;

    try {
            const {rows: listManga} = await MangaMod.getListMangaByInput(input, client);
            res.json(listManga);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
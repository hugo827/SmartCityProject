const pool = require('../scripts/JS/database');
const FollowedMangaMod = require('../modele/followedManga');

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
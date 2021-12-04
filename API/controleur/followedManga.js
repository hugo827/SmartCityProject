const pool = require('../scripts/JS/database');
const FollowedManga = require('../modele/followedManga');


module.exports.getFollowedManga = async (req, res) => {
    const client = await pool.connect();
    const {id} = req.body;
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: followedMangas} = await FollowedManga.getFollowedManga(id, client);
            if(followedMangas !== undefined){
                res.json(followedMangas);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postFollowedManga = async (req, res) => {
    if(req.session) {
        const user = req.session;
        const body = req.body;
        const {state,fk_manga} = body;
        const client = await pool.connect();
        try{
            await FollowedManga.postFollowedManga(state,fk_manga,user.id_account, client);
            res.sendStatus(201);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }

    } else {
        res.sendStatus(401);
    }

};

module.exports.patchFollowedManga = async (req, res) => {
    if(req.session) {
        const {id, state} = req.body;
        const client = await pool.connect();
        try{
            await FollowedManga.patchFollowedManga(id, state, client);
            res.sendStatus(204);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
};


module.exports.deleteFollowedManga = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await FollowedManga.deleteFollowedManga(id, client);
            res.sendStatus(204);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
};

module.exports.getAllFollowedManga = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows: Mangas} = await FollowedManga.getAllFollowedManga(client);
        if(Mangas !== undefined){
            res.json(Mangas);
        } else {
            res.sendStatus(404);
        }

    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getCountFollowedManga = async (req, res) => {
    const client = await pool.connect();
    try {
        const nbAccount = await FollowedManga.getCountFollowedManga(client);
        res.json(nbAccount);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
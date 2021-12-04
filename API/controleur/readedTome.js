const pool = require('../scripts/JS/database');
const ReadedTome = require('../modele/readedTome');
const Manga = require("../modele/manga");


module.exports.getReadedTome = async (req, res) => {
    const client = await pool.connect();
    const {fk_manga, fk_user} = req.body;
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: readedTomes} = await ReadedTome.getReadedTome(fk_manga, fk_user, client);
            if(readedTomes !== undefined){
                res.json(readedTomes);
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

module.exports.postReadedTome = async (req, res) => {
    if(req.session) {
        const body = req.body;
        const {read_at, fk_followed_manga, fk_user, fk_tome} = body;
        const client = await pool.connect();
        try{
            await ReadedTome.postReadedTome(read_at, fk_followed_manga, fk_user, fk_tome, client);
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

module.exports.patchReadedTome = async (req, res) => {
    if(req.session) {
        const {id, read_at} = req.body;
        const client = await pool.connect();
        try{
            await ReadedTome.patchReadedTome(id, read_at, client);
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


module.exports.deleteReadedTome = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await ReadedTome.deleteReadedTome(id, client);
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


module.exports.getAllReadedTome = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows: Mangas} = await ReadedTome.getAllReadedTome(client);
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


module.exports.getCountReadedTome = async (req, res) => {
    const client = await pool.connect();
    try {
        const nbAccount = await ReadedTome.getCountReadedTome(client);
        res.json(nbAccount);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

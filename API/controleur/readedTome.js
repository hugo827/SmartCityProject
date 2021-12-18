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

module.exports.getReadedTomeId = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: readedTomes} = await ReadedTome.getReadedTomeID(id, client);
            const readedTome = readedTomes[0];
            if(readedTome !== undefined){
                res.json(readedTome);
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

        const tab = read_at.split('-');
        const readAt = `${tab[0]}${tab[1]}${tab[2]}`;
        const fkFollowedManga = parseInt(fk_followed_manga);
        const fkUser = parseInt(fk_user);
        const fkTome = parseInt(fk_tome);

        const client = await pool.connect();
        try{
            await ReadedTome.postReadedTome(readAt, fkFollowedManga, fkUser, fkTome, client);
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
        const {id, read_at, fk_followed_manga, fk_user, fk_tome} = req.body;
        const client = await pool.connect();
        try{
            await ReadedTome.patchReadedTome(id, read_at, fk_followed_manga, fk_user, fk_tome, client);
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
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: Mangas} = await ReadedTome.getAllReadedTome(client, offset);
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

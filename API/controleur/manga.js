const pool = require('../scripts/JS/database');
const Manga = require('../modele/manga');

module.exports.getManga = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: Mangas} = await Manga.getManga(id, client);
            const manga = Mangas[0];
            if(manga !== undefined){
                res.json(manga);
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

module.exports.getAllManga = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: Mangas} = await Manga.getAllManga(client, offset);
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


module.exports.postManga = async (req, res) => {
    if(req.session) {
        const body = req.body;
        const {title, synopsis, new_price, type, sub_genre, author, publisher, main_picture, is_finish} = body;
        const client = await pool.connect();
        try{
            await Manga.postManga(title, synopsis, new_price, type, sub_genre, author, publisher, main_picture, is_finish, client);
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

module.exports.patchManga = async (req, res) => {
    if(req.session) {
        const {id, title, synopsis, new_price, type, sub_genre, author, publisher, main_picture, is_finish} = req.body;
        const client = await pool.connect();
        try{
            await Manga.patchManga(id, title, synopsis, new_price, type, sub_genre, author, publisher, main_picture, is_finish, client);
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


module.exports.deleteManga = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await Manga.deleteManga(id, client);
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

module.exports.getCountManga = async (req, res) => {
    const client = await pool.connect();
    try {
        const nbAccount = await Manga.getCountManga(client);
        res.json(nbAccount);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

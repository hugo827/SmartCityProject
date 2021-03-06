const pool = require('../scripts/JS/database');
const Manga = require('../modele/manga');
const Tome = require("../modele/tome");
const FollowedManga = require('../modele/followedManga');
const ReadedTome = require('../modele/readedTome');
const {Buffer} = require("buffer");


/**
 * @swagger
 *  components:
 *      responses:
 *          MangaGet:
 *              description: Le manga a été trouvé
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Manga'
 */

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


            if(manga.picture !== null) {
                let hex = Buffer.from(manga.picture, 'hex').toString('base64');
                manga.picture = hex;
            }


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
/**
 * @swagger
 *  components:
 *      responses:
 *          MangaList:
 *              description:  renvoie la liste des comptes à partir du offset (limiter a n)
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/MangaList'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      MangaList:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id_manga:
 *                      type: integer
 *                  title:
 *                      type: string
 *                  synopsis:
 *                      type: string
 *                  new_price:
 *                      type: integer
 *                  type:
 *                      type: string
 *                  sub_genre:
 *                      type: string
 *                  author:
 *                      type: string
 *                  publisher:
 *                      type: string
 *                  picture:
 *                      type: string
 *                      format: base64
 *                  is_finish:
 *                      type: boolean
 */

module.exports.getAllManga = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: Mangas} = await Manga.getAllManga(client, offset);

        for(let i in Mangas) {
            if(Mangas[i].picture !== null) {
                let hex = Buffer.from(Mangas[i].picture, 'hex').toString('base64');
                Mangas[i].picture = hex;
            }
        }

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
        const {title, synopsis, new_price, type, sub_genre, author, publisher, is_finish} = req.body;

        const picture =  req?.files?.picture !== undefined ? req?.files?.picture[0] : null ;
        let pictureHexX = null;

        const client = await pool.connect();
        try{
            if(picture !== null) {
                const pictureHex = picture.buffer.toString('hex');
                pictureHexX = '\\x' + pictureHex;
             }


            await Manga.postManga(title, synopsis, new_price, type, sub_genre, author, publisher, pictureHexX, is_finish, client);
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

/**
 * @swagger
 * components:
 *  schemas:
 *      Manga:
 *          type: object
 *          properties:
 *              id_manga:
 *                  type: integer
 *              title:
 *                  type: string
 *              synopsis:
 *                  type: string
 *                  format: text
 *              new_price:
 *                  type: integer
 *              type:
 *                  type: string
 *              sub_genre:
 *                  type: string
 *              author:
 *                  type: string
 *              publisher:
 *                  type: string
 *              picture:
 *                  type: string
 *                  format: base64
 *              is_finish:
 *                  type: boolean
 *          required:
 *              - id_manga
 *              - title
 *              - synopsis
 *              - new_price
 *              - type
 *              - sub_genre
 *              - author
 *              - publisher
 *              - picture
 */
module.exports.patchManga = async (req, res) => {
    if(req.session) {
        const {id_manga, title, synopsis, new_price, type, sub_genre, author, publisher, is_finish} = req.body;
        const picture =  req?.files?.picture !== undefined ? req.files.picture[0] : null;
        let pictureHexX = null;
        if(picture !== null) {
            const pictureHex = picture.buffer.toString('hex');
            pictureHexX = '\\x' + pictureHex;
        }
        const client = await pool.connect();
        try{
            await Manga.patchManga(id_manga, title, synopsis, new_price, type, sub_genre, author, publisher, pictureHexX, is_finish, client);
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
            await client.query("BEGIN;");
            let promises = [];
            const {rows} =  await FollowedManga.getFollowedMangaByIdManga(id, client);
            if(rows.length !== 0) {
                for(let elem of rows) {
                    promises.push(await ReadedTome.deleteFollowedMangaTome(elem["id_followed_manga"], client));
                }
                promises.push(await FollowedManga.deleteFollowedMangaIDManga(id, client));
            }
            const {rows: tomes} = await Tome.getTomeManga(id, client)
            if(tomes.length > 0) {
                promises.push(await Tome.deleteTomeManga(id, client));
            }
            promises.push(await Manga.deleteManga(id, client));

            const response = await Promise.all(promises);
            let i = 0;
            let isDelete = true;

            while(i < response.length && isDelete) {
                if(response[i].rowCount === 0) isDelete = false;
                i++
            }
            if (isDelete) {
                await client.query("COMMIT")
                res.sendStatus(204);
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "Un problème est survenue lors de la suppression du manga"});
            }
        } catch (error){
            await client.query("ROLLBACK");
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
        const nbManga = await Manga.getCountManga(client);
        res.json(nbManga);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

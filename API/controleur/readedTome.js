const pool = require('../scripts/JS/database');
const ReadedTome = require('../modele/readedTome');
const Manga = require("../modele/manga");


/**
 * @swagger
 * components:
 *  schemas:
 *      ReadedTomeByManga:
 *          type: object
 *          properties:
 *              fk_user:
 *                  type: integer
 *              fk_manga:
 *                  type: integer
 */
module.exports.getReadedTome = async (req, res) => {
    const client = await pool.connect();
    const {fk_manga, fk_user} = req.body;
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: readedTomes} = await ReadedTome.getReadedTome(fk_manga, fk_user, client);

            for(let i in readedTomes) {
                if(readedTome[i].read_at !== null) {
                    let year = readedTome[i].read_at.getFullYear();
                    let month = readedTome[i].read_at.getMonth() +1;
                    let day = readedTome[i].read_at.getDay();
                    let dateString = `${year}/${month}/${day}`;
                    readedTome.read_at = dateString;
                }
            }
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

/**
 * @swagger
 *  components:
 *      responses:
 *          ReadedTome:
 *              description:  renvoie les information d'un tome lu a partir de l'id passé en paramètre
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/ReadedTome'
 */
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

            if(readedTome.read_at !== null) {
                let year = readedTome.read_at.getFullYear();
                let month = readedTome.read_at.getMonth() +1;
                let day = readedTome.read_at.getDay();
                month = month <= 9 ? `0${month}` : month;
                day = day <= 9 ? `0${day}` : day;
                let dateString = `${year}-${month}-${day}`;
                readedTome.read_at = dateString;
            }

            if(readedTome){
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
/**
 * @swagger
 * components:
 *  schemas:
 *      ReadedTome:
 *          type: object
 *          properties:
 *              id_readed_tome:
 *                  type: integer
 *              read_at:
 *                  type: string
 *              fk_followed_manga:
 *                  type: integer
 *              fk_user:
 *                  type: integer
 *              fk_tome:
 *                  type: integer
 */
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
/**
 * @swagger
 *  components:
 *      responses:
 *          ReadedTomeList:
 *              description:  Renvoie la liste des tomes lus à partir du offset (limiter à n)
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/ReadedTomeList'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      ReadedTomeList:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id_readed_tome:
 *                      type: integer
 *                  read_at:
 *                      type: string
 *                  fk_followed_manga:
 *                      type: integer
 *                  fk_user:
 *                      type: integer
 *                  fk_tome:
 *                      type: integer
 */
module.exports.getAllReadedTome = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: readedTomes} = await ReadedTome.getAllReadedTome(client, offset);

        for(let i in readedTomes) {
            if(readedTomes[i].read_at !== undefined) {
                let year = readedTomes[i].read_at.getFullYear();
                let month = readedTomes[i].read_at.getMonth() +1;
                let day = readedTomes[i].read_at.getDay();
                readedTomes[i].read_at = `${day}/${month}/${year}`;
            }
        }

        if(readedTomes !== undefined){
            res.json(readedTomes);
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

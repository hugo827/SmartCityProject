const pool = require('../scripts/JS/database');
const FollowedManga = require('../modele/followedManga');
const ReadedTome = require('../modele/readedTome');


/**
 * @swagger
 *  components:
 *      responses:
 *          FollowedMangaGet:
 *              description: Le manga suivit a été trouvé
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/FollowedManga'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      FollowedManga:
 *          type: object
 *          properties:
 *              id_followed_manga:
 *                  type: integer
 *              state:
 *                  type: integer
 *              fk_manga:
 *                  type: integer
 *              fk_user:
 *                  type: integer
 */
module.exports.getFollowedManga = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: followedMangas} = await FollowedManga.getFollowedManga(id, client);
            const followedManga = followedMangas[0];
            if(followedManga !== undefined){
                res.json(followedManga);
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
 * components:
 *  schemas:
 *      FollowedMangaPost:
 *          type: object
 *          properties:
 *              state:
 *                  type: integer
 *              fk_manga:
 *                  type: integer
 *              fk_user:
 *                  type: integer
 */
module.exports.postFollowedManga = async (req, res) => {
    if(req.session) {
        const user = req.session;
        const body = req.body;
        const {state,fk_manga, fk_user} = body;

        const client = await pool.connect();
        try{
            await FollowedManga.postFollowedManga(state,fk_manga,fk_user, client);
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
        const {id, state, fk_user,fk_manga} = req.body;
        const client = await pool.connect();
        try{
            await FollowedManga.patchFollowedManga(id, state, fk_user,fk_manga, client);
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
            await client.query("BEGIN;")
            const resDelReadedTome = ReadedTome.deleteFollowedMangaTome(id, client);
            if(resDelReadedTome) {
                const resDelFollowedManga = await FollowedManga.deleteFollowedManga(id, client);
                if(resDelFollowedManga) {
                    await client.query("COMMIT")
                    res.sendStatus(204);
                }else {
                    await client.query("ROLLBACK");
                    res.status(404).json({error: "Un problème est survenue de la suppression du mangas suivit"});
                }
            } else {
                await client.query("ROLLBACK");
                res.status(404).json({error: "Un problème est survenue de la suppression des tomes lu"});
            }

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
 *          FollowedMangaList:
 *              description:  renvoie la liste des comptes à partir du offset (limiter a n)
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/FollowedMangaList'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      FollowedMangaList:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  id_followed_manga:
 *                      type: integer
 *                  state:
 *                      type: integer
 *                  fk_manga:
 *                      type: integer
 *                  fk_user:
 *                      type: integer
 */
module.exports.getAllFollowedManga = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: Mangas} = await FollowedManga.getAllFollowedManga(client, offset);
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
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
const pool = require('../scripts/JS/database');
const Tome = require('../modele/tome');
const {Buffer} = require("buffer");
/**
 * @swagger
 *  components:
 *      responses:
 *          TomeGet:
 *              description: Le tome a été trouvé
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Tome'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      Tome:
 *          type: object
 *          properties:
 *              id_tome:
 *                  type: integer
 *              number:
 *                  type: integer
 *              title:
 *                  type: string
 *              release_date:
 *                  type: string
 *              is_last_tome:
 *                  type: boolean
 *              fk_manga:
 *                  type: integer
 */
module.exports.getTome = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: tomes} = await Tome.getTome(id, client);
            const tome = tomes[0]


            if(tome.picture !== null) {
                    let base64 = Buffer.from(tome.picture, 'hex').toString('base64');
                    tome.picture = base64;
            }

            if(tome !== undefined){
                res.json(tome);
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

module.exports.postTome = async (req, res) => {
    if(req.session) {

        const {number, title, release_date, is_last_tome, fk_manga} = req.body;
        const picture =  req.files.picture[0];
        const pictureHex = picture.buffer.toString('hex');
        const pictureHexX = '\\x' + pictureHex;

        const client = await pool.connect();
        try{
            await Tome.postTome(number, title, pictureHexX, release_date,is_last_tome, fk_manga, client);
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

module.exports.patchTome = async (req, res) => {
    if(req.session) {

        const {id_tome, number, title, release_date, is_last_tome, fk_manga} = req.body;
        const picture =  req.files.picture[0];
        const pictureHex = picture.buffer.toString('hex');
        const pictureHexX = '\\x' + pictureHex;


        const client = await pool.connect();
        try{
            await Tome.patchTome(id_tome, number, title, pictureHexX, release_date, is_last_tome, fk_manga, client);
            res.sendStatus(204);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
};


module.exports.deleteTome = async (req, res) => {
    if(req.session) {
        const {id} = req.body;
        const client = await pool.connect();
        try{
            await Tome.deleteTome(id, client);
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
 *          TomeList:
 *              description:  renvoie la liste des comptes à partir du offset (limiter a n)
 *              content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/TomeList'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      TomeList:
 *          type: object
 *          properties:
 *              id_tome:
 *                  type: integer
 *              number:
 *                  type: integer
 *              title:
 *                  type: string
 *              picture:
 *                  type: object
 *              release_date:
 *                  type: object
 *                  format: date
 *              is_last_tome:
 *                  type: boolean
 *              fk_manga:
 *                  type: integer
 */
module.exports.getAllTome = async (req, res) => {
    const client = await pool.connect();
    const offsetText = req.params.offset;
    const offset = parseInt(offsetText);
    try{
        const {rows: tomes} = await Tome.getAllTome(client, offset);

        for(let i in tomes) {
            if(tomes[i].picture !== null) {
                let base64 = Buffer.from(tomes[i].picture, 'hex').toString('base64');
                tomes[i].picture = base64;
            }
        }

        if(tomes !== undefined){
            res.json(tomes);
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

module.exports.getCountTome = async (req, res) => {
    const client = await pool.connect();
    try {
        const nbAccount = await Tome.getCountTome(client);
        res.json(nbAccount);

    } catch (e) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getTomeManga = async (req, res) => {
    const client = await pool.connect();
    const {id} = req.body;
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: tomes} = await Tome.getTome(id, client);

            for(let i in tomes) {
                if(tomes[i].picture !== null) {
                    let base64 = Buffer.from(tomes[i].picture, 'hex').toString('base64');
                    tomes[i].picture = base64;
                }
            }

            if(tomes !== undefined){
                res.json(tomes);
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
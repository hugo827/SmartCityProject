const pool = require('../scripts/JS/database');
const Tome = require('../modele/tome');


module.exports.getTome = async (req, res) => {
    const client = await pool.connect();
    const {id} = req.body;
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: tomes} = await Tome.getTome(id, client);
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

module.exports.postTome = async (req, res) => {
    if(req.session) {
        const body = req.body;
        const {number, title, picture, release_date, fk_manga} = body;
        const client = await pool.connect();
        try{
            await Tome.postTome(number, title, picture, release_date, fk_manga,client);
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
        const {id, number, title, picture} = req.body;
        const client = await pool.connect();
        try{
            await Tome.patchTome(id, number, title, picture, client);
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


module.exports.getAllTome = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows: tomes} = await Tome.getAllTome(client);
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

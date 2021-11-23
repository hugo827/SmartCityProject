const pool = require('../scripts/JS/database');
const ReadedTome = require('../modele/readedTome');

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
};

module.exports.patchReadedTome = async (req, res) => {
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
};


module.exports.deleteReadedTome = async (req, res) => {
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
};
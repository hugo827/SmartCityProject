/**
 *@swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: L'action demandée ne peut être réalisée que par un administrateur
 */
module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session !== undefined && req.session.authLevel === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}

/**
 *@swagger
 * components:
 *  responses:
 *      mustBeOwner:
 *          description: L'action demandée ne peut être réalisée que par un administrateur ou un client.
 */
module.exports.mustBeOwner = (req, res, next) => {
    if(req.session !== undefined && (req.session.authLevel === "client" || req.session.authLevel === "admin") ){
        next();
    } else {
        res.sendStatus(403);
    }
}

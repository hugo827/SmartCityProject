const multer = require('multer');

const storageMemory =  multer.memoryStorage('multer');

const upload = multer( {
    limits: {
        fileSize: 700000 // TODO : a revoir la taille des fichiers upload max en fonction de l'utilité.
    },
    storage: storageMemory
});

module.exports.upload = upload;

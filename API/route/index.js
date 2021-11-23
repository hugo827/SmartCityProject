/*const accountRouter = require('./account');*/
const followedMangaRouter = require('./followedManga');
const mangaRouter = require('./manga');
const readedTomeRouter = require('./readedTome');
const tomeRouter = require('./tome');


const router = require("express").Router();


router.use("/followedManga", followedMangaRouter);
router.use("/manga", mangaRouter);
router.use("/readedTome", readedTomeRouter);
router.use("/tome", tomeRouter);


module.exports = router;

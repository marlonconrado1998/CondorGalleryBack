const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Helpers
var Image = require('../helpers/image');
var image = new Image();

router.post('/image', (req, res) => {
    image.save(req, res).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    });
});

router.delete('/image/:idimage', (req, res) => {

    let idimage = req.params.idimage;

    image.removeById(idimage).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    });
});


router.get('/list_images', (req, res) => {
    image.getAll().then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    });
});


router.get('/image/:idimage', (req, res) => {
    let idimage = req.params.idimage;
    let readStream = image.getById(idimage);
    readStream.pipe(res);
});


router.post('/add_to_album', (req, res) => {

    let {
        idalbum,
        idimage
    } = req.body;
    let albumObjectId = new mongoose.mongo.ObjectId(idalbum);
    let imageObjectId = new mongoose.mongo.ObjectId(idimage);

    image.addToAlbum(imageObjectId, albumObjectId).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

router.put('/remove_from_album/:idimage', (req, res) => {

    let idimage = req.params.idimage;
    let imageObjectId = new mongoose.mongo.ObjectId(idimage);

    image.removeFromAlbum(imageObjectId).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

router.get('/filter_image/:name/:dateFrom/:dateTo', (req, res) => {

    let {
        name,
        dateFrom,
        dateTo
    } = req.params;

    let df = [];
    let dt = [];
    let ddf = "null";
    let ddt = "null";

    if (dateFrom !== "null", dateTo !== "null") {
        df = dateFrom.split('-');
        dt = dateTo.split('-');
        ddf = new Date(df[0], (df[1] - 1), df[2]);
        ddt = new Date(dt[0], (dt[1] - 1), dt[2]);
    }

    image.filterImage(name, ddf, ddt).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    });
});

module.exports = router;
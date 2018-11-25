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

module.exports = router;
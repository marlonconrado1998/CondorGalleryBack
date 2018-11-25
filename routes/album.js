const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Helpers 
var Image = require('./../helpers/image');
var Album = require('./../helpers/album');

// Classes
var image = new Image();
var album = new Album();

// This service create a new album
router.post('/album', (req, res) => {

    let data = {
        name: req.body.name,
        date: new Date(),
    };
    album.save(data).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

// Get images belong an album
router.get('/albums_images/:idalbum', (req, res) => {

    let idalbum = req.params.idalbum;
    let objectId = new mongoose.mongo.ObjectId(idalbum);

    image.getByAlbum(objectId).then((resp) => {
        res.status(200).json(resp);
    }).catch((error) => {
        res.status(400).json(error);
    })
});

router.get('/albums', (req, res) => {
    album.getAll().then((albums) => {
        res.status(200).json(albums);
    }).catch((error) => {
        res.status(400).json(error);
    });
});

module.exports = router;
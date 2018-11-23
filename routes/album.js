const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

var Album = require('../models/album');
var File = require('./../models/file');

// This service create a new album
router.post('/album', (req, res) => {

    let {name} = req.body;

    let album = new Album({
        name,
        date: new Date(),
    })

    album.save((error, userDB) => {
        if (error) {
            return res.status(400).json({
                status: 400,
                error
            });
        };
        return res.status(201).json(userDB);
    });
});

// Get images belong an album
router.get('/albums_images/:idalbum', (req, res) => {

    let idalbum = req.params.idalbum;
    let objectId = new mongoose.mongo.ObjectId(idalbum);

    File.find({
        albums_id: objectId
    }, (err, files) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: "¡Error! Could not get images."
            });
        }
        res.status(200).json({
            ok: true,
            data: files,
            msg: "Images got correctly."
        });
    });
});

module.exports = router;
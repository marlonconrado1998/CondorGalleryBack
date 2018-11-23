const express = require('express');
const router = express.Router();

var Album = require('../models/album');

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

module.exports = router;
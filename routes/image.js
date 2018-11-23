const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
require('./../configs/config');

const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const conn = mongoose.createConnection(process.env.MONGO_URI);
var gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});


var storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});

var upload = multer({
    storage: storage
}).single('file');


// Save a new image
router.post('/image', (req, res) => {

    let file = req.file;

    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: "¡Error! The image was not uploaded."
            });
        };
        return res.status(200).json({
            ok: true,
            data: {},
            msg: "Image uploaded correctly."
        });
    });
});


// Delete an image
router.delete('/image/:idimage', (req, res) => {

    let idimage = req.params.idimage;

    gfs.remove({
        _id: idimage,
        root: 'images'
    }, function (err) {
        if (err) {
            res.status(400).json({
                ok: false,
                error: "¡Error! The image was not deleted."
            })
        }
        res.status(200).json({
            ok: true,
            data: {},
            msg: "Image deleted correctly."
        })
    });
});


// Get metadata of images list  
router.get('/list_images', (req, res) => {
    gfs.files.find().toArray(function (err, files) {
        if (err) {
            res.status(200).json({
                ok: false,
                error: "¡Error! Could not get images."
            });
        }
        res.status(200).json({
            ok: true,
            data: files,
            msg: "Images got correctly."
        });
    })
});


// Get an image by _id
router.get('/image/:idimage', (req, res) => {

    let idimage = req.params.idimage;
    
    const readStream = gfs.createReadStream({
        _id: idimage
    });
    readStream.pipe(res);
});

module.exports = router;
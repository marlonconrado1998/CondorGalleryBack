const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
var FileSchema = require('./../models/file');

module.exports = class Image {

    constructor() {
        const conn = mongoose.createConnection(process.env.MONGO_URI);
        conn.once('open', () => {
            this.gfs = Grid(conn.db, mongoose.mongo);
            this.gfs.collection('images');
        });

        this.upload = multer({
            storage: new GridFsStorage({
                url: process.env.MONGO_URI,
                file: (req, file) => {
                    return new Promise((resolve, reject) => {
                        crypto.randomBytes(16, (err, buf) => {
                            if (err) return reject(err);
                            const filename = file.originalname;
                            const fileInfo = {
                                filename: filename,
                                bucketName: 'images'
                            };
                            resolve(fileInfo);
                        });
                    });
                }
            })
        }).single('file');
    }

    // Save an image
    save(req, res) {
        return new Promise((resolve, reject) => {
            this.upload(req, res, function (err, file) {
                console.log(file);
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! The image was not uploaded."
                    });
                };
                return resolve({
                    ok: true,
                    data: req.file,
                    msg: "Image uploaded successfully."
                });
            });
        });
    }

    // Remove a image by _id
    removeById(idimage) {
        return new Promise((resolve, reject) => {
            this.gfs.remove({
                _id: idimage,
                root: 'images'
            }, (err) => {
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! The image was not deleted."
                    })
                }
            });
            return resolve({
                ok: true,
                data: {},
                msg: "Image deleted successfully."
            });
        });
    }

    // Get all images list
    getAll() {
        return new Promise((resolve, reject) => {
            FileSchema.find((err, images) => {
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! Could not get images."
                    });
                }
                return resolve(images);
            });
        });
    }

    // Get a image by _id
    getById(idimage) {
        const readStream = this.gfs.createReadStream({
            _id: idimage
        });
        return readStream;
    }

    // Get images belongs an album
    getByAlbum(idalbum) {
        return new Promise((resolve, reject) => {
            FileSchema.find({
                albums_id: idalbum
            }, (err, files) => {
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! Could not get images."
                    });
                }
                return resolve(files);
            });
        });
    }


    // Add an image to album
    addToAlbum(idimage, idalbum) {
        return new Promise((resolve, reject) => {
            FileSchema.update({
                _id: idimage
            }, {
                $set: {
                    albums_id: idalbum
                }
            }, {
                new: false
            }, function (err, file) {
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! Could not add the image."
                    });
                };
                return resolve({
                    ok: true,
                    data: file,
                    msg: "Image added successfully."
                });
            });
        });
    }

    // Remove an image from album
    removeFromAlbum(idimage) {
        return new Promise((resolve, reject) => {
            FileSchema.update({
                _id: idimage
            }, {
                $set: {
                    albums_id: null
                }
            }, {
                new: false
            }, function (err, file) {
                if (err) {
                    return reject({
                        ok: false,
                        msg: "¡Error! Could not remove the image."
                    });
                };
                return resolve({
                    ok: true,
                    data: file,
                    msg: "Image removed from album successfully."
                });
            });
        });
    }

    // Search images by (name, date)
    filterImage(name, from, to) {

        let query = {};
        if (name && name != "null") query.filename = name;
        if (from != "null" && to != "null") {
            query.uploadDate = {
                $gte: from,
                $lte: to
            };
        }
        return new Promise((resolve, reject) => {
            FileSchema.find(query, (error, imagesDb) => {
                if (error) {
                    reject({
                        ok: false,
                        msg: "¡Error! Could not get images."
                    });
                }
                resolve(imagesDb);
            });
        });
    }
}
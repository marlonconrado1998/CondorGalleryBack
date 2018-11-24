const AlbumSchema = require('../models/album');

module.exports = class Album {
    
    constructor() {}


    // Create a new album
    save(data) {
        let album = new AlbumSchema(data);
        return new Promise((resolve, reject) => {
            album.save((error, albumDb) => {
                if (error) {
                    return reject({
                        ok: false,
                        msg: "¡Error! The image was not uploaded."
                    });
                };
                return resolve({
                    ok: true,
                    msg: `Album ${albumDb.name} created successfully.`
                });
            });
        });
    }
}
const formidable = require("formidable")
const logger = require('tracer').colorConsole();
const fs = require("fs");
const { Photo, photos } = require('./photo')

module.exports = {
    uploadFile: async (request, response) => {
        return new Promise((resolve, reject) => {
            try {
                let form = formidable({});
                form.keepExtensions = true;
                form.uploadDir = `uploads`
                form.parse(request, function (err, fields, files) {
                    if (err) console.log(err)

                    let id = new Date().getTime()                     // id
                    let album = fields.album                          // album
                    let originalName = (files.file.name)              // original name
                    let timeStamp = (files.file.lastModifiedDate)     // timeStamp
                    let url = (files.file.path);                      // url
                    let newUrlPath = url.split('\\')
                    console.log(newUrlPath)
                    newUrl = newUrlPath[0] + "\\" + album + "\\" + newUrlPath[1]
                    let history = [{ status: "original", timestamp: timeStamp }]
                    const photo = new Photo(id, album, originalName, newUrl, timeStamp, history)
                    photos.push(photo)

                    if (fs.existsSync(`./uploads/${album}`)) {
                        logger.warn('album juz istnieje.')
                    } else {
                        fs.mkdir(`./uploads/${album}`, (err) => {
                            if (err) throw err
                            logger.log('utworzony folder na plik.')
                        })
                    }

                    let currentName = url.split('uploads\\')
                    currentName = currentName[1]
                    let oldPath = `./uploads/${currentName}`
                    let newPath = `./uploads/${album}/${currentName}`

                    fs.rename(oldPath, newPath, function (err) {
                        logger.log('file saved in correct directory')
                    })
                    resolve(photo)
                })

            } catch (error) {
                reject(error);
            }
        })
    },
    readAllFiles: async (request, response) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(photos)
            } catch (error) {
                reject(error);
            }
        })
    },

    readOneFile: async (fileID) => {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < photos.length; i++) {
                    if (fileID == photos[i].id)
                        resolve(photos[i])
                }

            } catch (error) {
                reject(error);
            }
        })

    },

    deleteOneFile: async (fileID) => {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < photos.length; i++) {
                    if (fileID == photos[i].id) {
                        photos.splice(i, 1)
                    }
                }
                resolve(`The file with id = ${fileID} has been removed.`)

            } catch (error) {
                reject(error);
            }
        })

    },

    updateOneFile: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.parse(data)
                let id = data.id
                let lastChange = data.lastChange
                let timeStamp = new Date().getTime()
                let historyObject = { status: "zmienione", timestamp: timeStamp }
                for (let i = 0; i < photos.length; i++) {
                    if (id == photos[i].id) {
                        photos[i].lastChange = lastChange
                        photos[i].history.push(historyObject)
                        resolve(photos[i])
                    }
                }

            } catch (error) {
                reject(error);
            }
        })
    },
    readOneFileTags: async (imageID) => {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < photos.length; i++) {
                    if (imageID == photos[i].id)
                        resolve(photos[i].tags)
                }

            } catch (error) {
                reject(error);
            }
        })
    },




}
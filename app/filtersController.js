const logger = require('tracer').colorConsole();
const { Photo, photos } = require('./photo')
const sharp = require("sharp");
const { filters } = require('./filters');


module.exports = {
    readPossibleFilters: async (imageID) => {
        return new Promise(async (resolve, reject) => {
            try {
                let myImage;
                for (let i = 0; i < photos.length; i++) {
                    if (imageID == photos[i].id) {
                        myImage = photos[i]
                    }
                }
                let url = myImage.url
                if (url) {
                    let meta = await sharp(url)
                        .metadata()
                    resolve(meta)
                }
                else {
                    resolve("url_not_found")
                }

            } catch (err) {
                reject(err.mesage)
            }
        })
    },

    applyFilter: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                data = JSON.parse(data)
                const id = data.id
                const option = data.lastChange
                const rotateValue = data.rotate
                const widthValue = data.width
                const heightValue = data.height
                const formatValue = data.fromat
                const leftValue = data.left
                const topValue = data.top
                const rValue = data.r
                const gValue = data.g
                const bValue = data.b
                for (let i = 0; i < photos.length; i++) {
                    if (id == photos[i].id) {
                        const url = photos[i].url
                        const urlExtension = url.substring(url.length - 4)
                        const urlPrefix = url.slice(0, url.length - 4)
                        const file = urlPrefix + "-" + option + urlExtension
                        switch (option) {
                            case "rotate":
                                await sharp(url)
                                    .rotate(rotateValue)
                                    .toFile(file);
                                break;
                            case "crop":
                                await sharp(url)
                                    .extract({ width: widthValue, height: heightValue, left: leftValue, top: topValue })
                                    .toFile(file);
                                break;

                            case "flip":
                                await sharp(url)
                                    .flip()
                                    .toFile(file);
                                break;
                            case "flop":
                                await sharp(url)
                                    .flop()
                                    .toFile(file);
                                break;
                            case "grayscale":
                                await sharp(url)
                                    .grayscale()
                                    .toFile(file);
                                break;
                            case "resize":
                                await sharp(url)
                                    .resize({
                                        width: widthValue,
                                        height: heightValue
                                    })
                                    .toFile(file);
                                break;
                            case "negate":
                                await sharp(url)
                                    .negate()
                                    .toFile(file);
                                break;
                            case "format":
                                await sharp(url)
                                    .toFormat(formatValue)
                                    .toFile(file);
                                break;
                            case "tint":
                                await sharp(url)
                                    .tint({ r: rValue, g: gValue, b: bValue })
                                    .toFile(file);
                                break;
                        }
                        photos[i].lastChange = option
                        photos[i].url = file
                        let filterHistory = { status: option, timestamp: new Date(), url: file }
                        photos[i].history.push(filterHistory)
                        resolve(photos[i])

                    }
                }


            } catch (error) {
                reject(error);
            }
        })

    },
    readFilters: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(filters)
            }
            catch (error) {
                reject(error)
            }

        })
    },





}
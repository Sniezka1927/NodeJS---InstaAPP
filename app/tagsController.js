const logger = require('tracer').colorConsole();
const fs = require("fs");
const { photos } = require('./photo');
const { Tag, tags } = require('./tags')

module.exports = {
    getAllTagsArr: async () => {
        return new Promise((resolve, reject) => {
            try {
                let allTags = []
                for (let i = 0; i < tags.length; i++)
                    allTags.push(tags[i].tag)
                resolve(allTags)
            } catch (error) {
                reject(error);
            }
        })
    },

    getAllTagsObj: async () => {
        return new Promise((resolve, reject) => {
            try {
                resolve(tags)
            } catch (error) {
                reject(error);
            }
        })
    },


    getOneTag: async (tagID) => {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < tags.length; i++) {
                    if (tagID == tags[i].id)
                        resolve(tags[i])
                }

            } catch (error) {
                reject(error);
            }
        })

    },
    uploadNewTag: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.parse(data)
                newTag = { id: tags.length + 1, tag: data.name, popularity: data.popularity }
                tags.push(newTag)
                resolve(`Tag ${data.name} został dodany`)
            } catch (error) {
                reject(error);
            }
        })
    },
    updatePictureTag: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.parse(data)
                let id = data.id
                let addTag = data.tag
                for (let i = 0; i < photos.length; i++) {
                    for (let j = 0; j < tags.length; j++) {
                        if (photos[i].id == id && tags[j].tag == addTag) {
                            photos[i].tags.push(tags[j])
                            resolve(photos[i])
                        }
                    }
                }
            } catch (error) {
                reject(error);
            }
        })
    },
    updatePictureTags: async (data) => {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.parse(data)
                let id = data.id
                let tagsArr = data.tags
                for (let k = 0; k < tagsArr.length; k++) {
                    let addTag = tagsArr[k]
                    for (let i = 0; i < photos.length; i++) {
                        for (let j = 0; j < tags.length; j++) {
                            if (photos[i].id == id && tags[j].tag == addTag) {
                                photos[i].tags.push(tags[j])
                                resolve(photos[i])
                            }
                        }
                    }
                }

            } catch (error) {
                reject(error);
            }
        })
    },




}
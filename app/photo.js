class Photo {
    constructor(id, album, originalName, url, lastChange, history) {
        this.id = id
        this.album = album;
        this.originalName = originalName;
        this.url = url;
        this.lastChange = lastChange;
        this.history = history;
        this.tags = [];
    }
}


let photos = []

module.exports = { Photo, photos }
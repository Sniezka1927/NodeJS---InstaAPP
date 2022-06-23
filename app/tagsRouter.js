const tagController = require('./tagsController')
const logger = require('tracer').colorConsole();
const getRequestData = require("./getRequestData")


const router = async (request, response) => {

    /*
        PATCH /api/photos/tags  // aktualizacja danych zdjęcia o nowy tag
        PATCH /api/photos/tags/mass // aktualizacja danych zdjęcia o tablicę nowych tag-ów
        GET /api/photos/12345/tags // pobranie tagów danego zdjęcia
    */

    if (request.url == "/api/tags/raw" && request.method == "GET") {
        logger.info('all Tags Array sent')
        let allTags = await tagController.getAllTagsArr();
        response.end(JSON.stringify(allTags, null, 5))
    } else if (request.url == "/api/tags" && request.method == "GET") {
        logger.info('all Tags Object sent')
        let allTags = await tagController.getAllTagsObj();
        response.end(JSON.stringify(allTags, null, 5))
    } else if (request.url.match(/\/api\/tags\/([0-9]+)/) && request.method == "GET") {
        logger.info('one tag sent')
        let urlArray = (request.url.split("/"))
        let tagID = urlArray[urlArray.length - 1]
        let oneTag = await tagController.getOneTag(tagID)
        response.end(JSON.stringify(oneTag, null, 5))
    } else if (request.url == "/api/tags" && request.method == "POST") {
        logger.info('uploaded one tag')
        let data = await getRequestData(request)
        let newTag = await tagController.uploadNewTag(data)
        response.end(JSON.stringify(newTag, null, 5))
    } else if (request.url == "/api/tags" && request.method == "PATCH") {
        logger.info('tag added')
        let data = await getRequestData(request)
        let finalVersion = await tagController.updatePictureTag(data)
        response.end(JSON.stringify(finalVersion, null, 5))

    } else if (request.url == "/api/tags/mass" && request.method == "PATCH") {
        logger.info('mass tag added')
        let data = await getRequestData(request)
        let finalVersion = await tagController.updatePictureTags(data)
        response.end(JSON.stringify(finalVersion, null, 5))
    } else if (request.url.match(/\/api\/tags\/([0-9]+)/) && request.method == "GET") {
        logger.info('tags of photo sent')
        let urlArray = (request.url.split("/"))
        let tagID = urlArray[urlArray.length - 1]
        let oneTag = await tagController.getOneTag(tagID)
        response.end(JSON.stringify(oneTag, null, 5))
    }





}

module.exports = router



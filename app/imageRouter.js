const fileController = require("./fileController")
const jsonController = require('./jsonController')
const getRequestData = require("./getRequestData")
const tagController = require('./tagsController')

const logger = require('tracer').colorConsole();

const router = async (request, response) => {


    if (request.url == "/api/photos" && request.method == "POST") {
        logger.info('file uploaded')
        let photo = await fileController.uploadFile(request);
        response.end(JSON.stringify(photo, null, 5))
    } else if (request.url == "/api/photos" && request.method == "GET") {
        logger.info('reading all images')
        let allFiles = await fileController.readAllFiles(request, response)
        response.end(JSON.stringify(allFiles, null, 5))
    } else if (request.url.match(/\/api\/photos\/([0-9]+)\/tags/) && request.method == "GET") {
        logger.info('reading tags of one image')
        let urlArray = (request.url.split("/"))
        let imageID = urlArray[urlArray.length - 2]
        let oneFile = await fileController.readOneFileTags(imageID)
        response.end(JSON.stringify(oneFile, null, 5))
    } else if (request.url.match(/\/api\/photos\/([0-9]+)/) && request.method == "GET") {
        logger.info('reading one image')
        let urlArray = (request.url.split("/"))
        let fileID = urlArray[urlArray.length - 1]
        let oneFile = await fileController.readOneFile(fileID)
        response.end(JSON.stringify(oneFile, null, 5))
    } else if (request.url.match(/\/api\/photos\/([0-9]+)/) && request.method == "DELETE") {
        logger.info('removing one image')
        let urlArray = (request.url.split("/"))
        let fileID = urlArray[urlArray.length - 1]
        let confirmation = await fileController.deleteOneFile(fileID)
        response.end(JSON.stringify(confirmation, null, 5))
    } else if (request.url == "/api/photos" && request.method == "PATCH") {
        logger.info('adjusting one image')
        let data = await getRequestData(request)
        let finalVersion = await fileController.updateOneFile(data)
        response.end(JSON.stringify(finalVersion, null, 5))
    } else if (request.url == "/api/photos/tags" && request.method == "PATCH") {
        logger.info('tag added')
        let data = await getRequestData(request)
        let finalVersion = await tagController.updatePictureTag(data)
        response.end(JSON.stringify(finalVersion, null, 5))

    } else if (request.url == "/api/photos/tags/mass" && request.method == "PATCH") {
        logger.info('mass tag added')
        let data = await getRequestData(request)
        let finalVersion = await tagController.updatePictureTags(data)
        response.end(JSON.stringify(finalVersion, null, 5))
    } else if (request.url.match(/\/api\/photos\/tags\/([0-9]+)/) && request.method == "GET") {
        logger.info('tags of photo sent')
        let urlArray = (request.url.split("/"))
        let tagID = urlArray[urlArray.length - 1]
        let oneTag = await tagController.getOneTag(tagID)
        response.end(JSON.stringify(oneTag, null, 5))
    } else if (request.url.match((/\/api\/photos\/uploads\/(^[a-z][-a-z0-9\._]*$)/)) && request.method == "GET") {
        logger.info('display image.')
    }


}

module.exports = router



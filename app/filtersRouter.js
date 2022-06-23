const getRequestData = require("./getRequestData")
const filterController = require("./filtersController")
const logger = require('tracer').colorConsole();

const router = async (request, response) => {

    if (request.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && request.method == "GET") {
        logger.info('reading image details')
        let urlArray = (request.url.split("/"))
        let imageID = urlArray[urlArray.length - 1]
        let possibleFilters = await filterController.readPossibleFilters(imageID);
        response.end(JSON.stringify(possibleFilters, null, 5))
    } else if (request.url == "/api/filters" && request.method == "GET") {
        logger.info('reading filters')
        let possibleFilters = await filterController.readFilters();
        response.end(JSON.stringify(possibleFilters, null, 5))
    }
    else if (request.url == "/api/filters" && request.method == "PATCH") {
        logger.info('applying filters')
        let data = await getRequestData(request)
        let allFiles = await filterController.applyFilter(data)
        response.end(JSON.stringify(allFiles, null, 5))
    }

}

module.exports = router



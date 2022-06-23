const logger = require('tracer').colorConsole();
const fs = require("fs")

const router = async (request, response) => {

    if (request.url.match((/\/uploads\/[a-zA-Z_][0-9a-zA-Z_]*\/[a-zA-Z_][0-9a-zA-Z_]*/)) && request.method == "GET") {
        logger.info('display image')
        fs.readFile(`./${request.url}`, function (error, data) {
            response.writeHead(200, { 'Content-Type': 'image/jpeg' });
            response.write(data);
            response.end();
        })
    }

}

module.exports = router



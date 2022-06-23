const http = require('http');
const PORT = process.env.port || 3000;
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const filterRouter = require("./app/filtersRouter")
const displayRouter = require("./app/displayRouter")
const userRouter = require("./app/userRouter")
const logger = require('tracer').colorConsole();
require("dotenv/config")

http.createServer(async (req, res) => {

    //images

    if (req.url.search("/api/photos") != -1) {
        await imageRouter(req, res)
    }

    //tags

    else if (req.url.search("/api/tags") != -1) {
        await tagsRouter(req, res)
    }

    // filters

    else if (req.url.search("/api/filters") != -1) {
        await filterRouter(req, res)
    }

    // display image

    else if (req.url.search("/uploads/") != -1) {
        await displayRouter(req, res)
    }

    // user

    else if (req.url.search("/api/users") != -1) {
        await userRouter(req, res)
    }

})
    .listen(PORT, () => logger.trace(`Server is running on PORT ${PORT}`))
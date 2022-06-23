const logger = require('tracer').colorConsole();
const getRequestData = require("./getRequestData")
const userController = require("./userController")
const fileController = require("./fileController")
const router = async (request, response) => {

    if (request.url == "/api/users/register" && request.method == "POST") {
        logger.info('adding user')
        let data = await getRequestData(request)
        let userCredits = await userController.addUser(data)
        response.end(JSON.stringify(userCredits, null, 5))

    } else if (request.url.match(/\/api\/users\/confirm\/[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/) && request.method == "GET") {
        let token = (request.url.split("/"))[4]
        console.log(token)
        let verify = await userController.verifyUser(token)
        response.end(JSON.stringify(verify, null, 5))
    } else if (request.url == "/api/users/login" && request.method == "POST") {
        let data = await getRequestData(request)
        let loginConfirmation = await userController.userLogin(data)
        response.end(JSON.stringify(loginConfirmation, null, 5))
    } else if (request.url == "/api/users/profile" && request.method == "POST") {
        if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
            let token = request.headers.authorization.split(" ")[1]
            let verifyToken = await userController.verifyAuthToken(token)
            if (verifyToken != false) {
                let image = await fileController.uploadFile(request)
                let updateProfileImg = await userController.setUserProfileImg(image, verifyToken)
                response.end(JSON.stringify(updateProfileImg, null, 5))

            }
            else
                response.end(JSON.stringify(verifyToken, null, 5))

        }
    } else if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        let token = request.headers.authorization.split(" ")[1]
        let verifyToken = await userController.verifyAuthToken(token)
        if (verifyToken != false) {
            let data = await getRequestData(request)
            let userCredits = await userController.getUserData(data, verifyToken)
            response.end(JSON.stringify(userCredits, null, 5))

        }
        else
            response.end(JSON.stringify(verifyToken, null, 5))

    }


}

module.exports = router



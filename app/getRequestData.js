getRequestData = async (request) => {

    return new Promise((resolve, reject) => {
        try {

            let body = "";

            request.on("data", (part) => {
                body += part.toString();
            });

            request.on("end", () => {
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })

}
module.exports = getRequestData

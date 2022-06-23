const logger = require('tracer').colorConsole();
const { users } = require("./users")
const { config } = require('./yahooConfig')
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport(config)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv/config")



module.exports = {
    userLogin: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                data = JSON.parse(data)
                let email = data.email
                let password = data.password
                for (let i = 0; i < users.length; i++) {
                    if (email == users[i].email) {
                        let checkPassword = await decryptPass(password, users[i].password)
                        console.log(checkPassword)
                        if (checkPassword == true) {
                            let newToken = await createToken(users[i]);
                            resolve(newToken)
                        }
                    }
                }
                console.log(email, password)

            }
            catch (error) {
                reject(error)
            }


        })
    },
    addUser: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                data = JSON.parse(data)
                let encryptedpassword = await encryptPass(data.password)
                const id = new Date().getTime()                     // id
                for (let i = 0; i < users.length; i++)
                    if (data.email == users[i].email) {
                        resolve("Podany email jest juz zajety")
                        return;
                    }

                let account = { id: id, profileImg: "none", name: data.name, lastName: data.lastName, login: data.login, password: encryptedpassword, email: data.email, verified: false, addedPictures: [] }
                console.log(account)
                users.push(account)
                let token = await createToken(account)
                console.log(token)
                await sendMailToUser(account, token)
                resolve(account)
            }
            catch (error) {
                reject(error)
            }

        })
    },

    verifyUser: async (token) => {
        return new Promise(async (resolve, reject) => {
            try {
                let decodedToken = await verifyToken(token)
                console.log(decodedToken)
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email == decodedToken.email) {
                        users[i].verified = true
                        sendConfirmationMail(users[i])
                        resolve(users[i])
                    }
                }

            }
            catch (error) {
                reject(error)
            }

        })
    },


    verifyAuthToken: async (token) => {
        return new Promise(async (resolve, reject) => {
            try {
                let verify = await verifyToken(token)
                if (verify != "token expired")
                    resolve(verify)
                else
                    resolve(false)
            }
            catch (error) {
                reject(error)
            }
        })

    },

    getUserData: async (data, token) => {
        return new Promise((resolve, reject) => {
            try {
                data = JSON.parse(data)
                for (let i = 0; i < users.length; i++) {
                    if (token.email == users[i].email) {
                        logger.log('User credits changed')
                        if (data.name != undefined)
                            users[i].name = data.name
                        if (data.lastName != undefined)
                            users[i].lastName = data.lastName
                        if (data.email != undefined)
                            users[i].email = data.email
                        resolve(users[i])
                    }
                }
            }
            catch (error) {
                reject(error)
            }
        })
    },

    setUserProfileImg: async (image, token) => {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < users.length; i++) {
                    if (token.email == users[i].email) {
                        logger.log('Profile picture set')
                        users[i].profileImg = image.url
                        resolve(users[i])
                    }
                }
            }
            catch (error) {
                reject(error)
            }
        })
    }

}
const sendMailToUser = async (account, token) => {
    return new Promise((resolve, reject) => {
        try {
            transporter.sendMail({
                from: process.env.yahoologin,
                to: account.email,
                subject: "Confirm your account",
                text: "Confirm your account by clicking the link below, link is valid for an hour",
                html: `http://localhost:3000/api/users/confirm/${token}`
            });
            logger.info('Verification email sent')
            resolve("email sent")
        } catch (error) {
            reject(error);
        }
    })
}

const sendConfirmationMail = async (account) => {
    return new Promise((resolve, reject) => {
        try {
            transporter.sendMail({
                from: process.env.yahoologin,
                to: account.email,
                subject: "Your Account has been verifeid",
                text: "Congratz your account has been verified",
                html: `gg`
            });
            logger.info(`${account.email} account has been verified`)
            resolve("email sent")
        } catch (error) {
            reject(error);
        }
    })
}

const encryptPass = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let encryptedPassword = await bcrypt.hash(password, 10);
            resolve(encryptedPassword)
        }
        catch (error) {
            reject(error)
        }

    })
}

const decryptPass = async (userpass, encrypted) => {
    return new Promise(async (resolve, reject) => {
        try {
            let decrypted = await bcrypt.compare(userpass, encrypted)
            resolve(decrypted)
        }
        catch (error) {
            reject(error)
        }

    })
}

const createToken = async (account) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = await jwt.sign(
                {
                    email: account.email
                },
                process.env.secretkey, // powinno być w .env
                {
                    expiresIn: "24h" // "1m", "1d", "24h"
                }
            );
            resolve(token)
        }
        catch (error) {
            reject(error)
        }
    })
}

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        try {
            let decoded = jwt.verify(token, process.env.secretkey)
            resolve(decoded)
        }
        catch (ex) {
            reject(ex.message)
        }
    })

}

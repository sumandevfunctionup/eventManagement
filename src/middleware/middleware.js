const jwt = require("jsonwebtoken")
const eventModel = require("../models/eventModel")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }
        let decodedToken = jwt.verify(token, "secuiretyKeyToCheckToken");
        
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }
        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}
let authorization = async function (req, res, next) {

    try {
        let token = req.headers["x-api-key"]
        if (!token) { return res.status(400).send({ status: false, message: "token must be present" }) }

        let decodedToken = jwt.verify(token, "secuiretyKeyToCheckToken")

        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "token is invalid" });
        }

        let decodedUserId = decodedToken.userId
        let eventIdParams = req.params.eventId

        let eventDetailsId = await eventModel.findOne({ _id: eventIdParams, isDeleted: false })
        if (!eventDetailsId) {
            return res.status(401).send({ status: false, msg: "no data found with this Id" });
        }

        let eventUserId = eventDetailsId.userId

        if (decodedUserId != eventUserId) { return res.status(403).send({ status: false, message: "You are not an authorized person to make these changes" }) }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}




module.exports.authentication=authentication;
module.exports.authorization=authorization;
const MessageResource = require("../helpers/MessageResource")

function errorHandler(err, req, res, next) {
    let errors;
    switch (err.name) {
        case MessageResource.errorNameUnauthorized():
            res.status(err.code).json({ message: err.message })
            break;
        case "Not Found":
            res.status(err.code).json({ message: err.message })
            break;
        case "Invalid User":
            res.status(err.code).json({ message: err.message })
            break;
        case "Forbidden":
            res.status(err.code).json({ message: err.message })
            break;
        case "Validation error":
            res.status(err.code).json({ message: err.message })
            break;
        case MessageResource.errorNameBadRequest():
            res.status(err.code).json({ message: err.message })
            break;
        case "SequelizeUniqueConstraintError":
            errors = err.errors.map(el => el.message)
            res.status(400).json({ message: errors })
            break;
        case "SequelizeValidationError":
            errors = err.errors.map(el => el.message)
            res.status(400).json({ message: errors })
            break;
        default:
            res.status(500).json({ message: "Internal server error" })
            break;
    }
}

module.exports = errorHandler
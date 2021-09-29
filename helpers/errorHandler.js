function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        console.log(err)
        return res.status(401).json({ message: 'The user is not authorized' })
    }

    if (err.name === 'ValidationError') {
        return res.status(500).json({ message: 'Validation error' })
    }

    return res.status(500).json(err)
}

module.exports = errorHandler

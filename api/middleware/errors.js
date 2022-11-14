"use strict"

const errorHandler = () => (err, req, res, next) => {
    let statusCode = res.statusCode ?? 500
    statusCode = statusCode >= 200 && statusCode < 300 ? 500 : statusCode

    console.error(err)

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'dev' ? err.stack : null
    })
}

const asyncHandler = (func) => (req, res, next) => {
    func(req, res)
        .catch(err => next(err))
}

module.exports = {
    errorHandler,
    asyncHandler
}
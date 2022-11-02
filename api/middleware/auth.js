"use strict"

const protect = (req, res, next) => {
    if (!req.session || !req.session.userId)
        return res.status(401).json({ message: 'Unauthorized' })

    return next()
}

const hasRole = (name) => [protect, (req, res, next) => {
    if (!req.session.roles.includes(name))
        return res.status(403).json({ message: 'Forbidden' })

    return next()
}]

const isAdmin = hasRole('ADMIN')

module.exports = {
    protect,
    isAdmin,
    hasRole
}
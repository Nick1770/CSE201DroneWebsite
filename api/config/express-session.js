"use strict"
const MySQLStore = require('express-mysql-session')
const { pool } = require('./mysql.js')

const sessionStore = new MySQLStore({}, pool)

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV !== 'dev',
        maxAge: 900000, // 15 minutes
        httpOnly: true
    },
    rolling: true,
    store: sessionStore,
}

module.exports = {
    sessionConfig
}
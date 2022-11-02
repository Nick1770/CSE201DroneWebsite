"use strict"
const mysql = require('mysql2/promise')

const dbOptions = {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
    
const pool = mysql.createPool(dbOptions)

const sproc = async (name, params = [], singleResponse = false) => {
    let sql = 'CALL ' + name + '(' + Array(params.length).fill('?').join() + ')'
    const response = (await pool.query(sql, params))[0]
    return singleResponse ? response[0][0] : response[0]
}

module.exports = {
    pool,
    sproc
}
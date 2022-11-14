"use strict"
const { Router } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')

const router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: get users
 *     tags:
 *       - "Users"
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       fName:
 *                         type: string
 *                       lName:
 *                         type: string
 */
router.get('/', asyncHandler(async (req, res) => {
    const users = await sproc('GetUsers')

    res.json({ users })
}))

module.exports = router
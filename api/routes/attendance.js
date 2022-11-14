"use strict"
const { Router } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')
const Auth = require('../middleware/auth.js')
const bcrypt = require('bcrypt')

const router = Router()

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: get attendance for a certain day
 *     tags:
 *       - "Attendance"
 *     parameters:
 *       - in: query
 *         name: onDate
 *         type: date
 *         description: attendance for a certain day "yyyy-mm-dd"
 *     responses:
 *       200:
 *         description: Event added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attendance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       email:
 *                         type: string
 *                       fName:
 *                         type: string
 *                       lName:
 *                         type: string
 *                       absent:
 *                         type: boolean
 */
router.get('/', Auth.isAdmin, asyncHandler(async (req, res) => {
    const { onDate } = req.query

    if (!onDate)
        return res.status(400).json({ message: 'missing fields in query' })

    const attendance = await sproc('GetAttendance', [onDate])

    res.json({ attendance })
}))

module.exports = router
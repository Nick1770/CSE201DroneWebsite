"use strict"
const { Router } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')
const Auth = require('../middleware/auth.js')
const bcrypt = require('bcrypt')

const router = Router()

/**
 * @swagger
 * /events:
 *   post:
 *     summary: add event
 *     tags:
 *       - "Events"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               start:
 *                 type: date
 *     responses:
 *       201:
 *         description: Event added
 */
router.post('/', Auth.isAdmin, asyncHandler(async (req, res) => {
    const { title, start } = req.body

    if (!title || !start)
        return res.status(400).json({ message: 'missing fields in body' })

    await sproc('AddEvent', [title, start])

    res.sendStatus(201)
}))

/**
 * @swagger
 * /events:
 *   get:
 *     summary: get events
 *     tags:
 *       - "Events"
 *     responses:
 *       201:
 *         description: Event added
 */
 router.get('/', Auth.isAdmin, asyncHandler(async (req, res) => {
    const events = await sproc('GetEvents', [], false)
    res.json({
        events 
    })
}))

module.exports = router
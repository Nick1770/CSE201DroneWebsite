"use strict"
const { Router } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')
const Auth = require('../middleware/auth.js')

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 */
router.post('/', Auth.isAdmin, asyncHandler(async (req, res) => {
    const { title, start } = req.body

    if (!title || !start)
        return res.status(400).json({ message: 'missing fields in body' })

    const id = await sproc('AddEvent', [title, start], true)

    res.status(201).json(id)
}))

/**
 * @swagger
 * /events:
 *   get:
 *     summary: get events
 *     tags:
 *       - "Events"
 *     parameters:
 *       - in: query
 *         name: startDate
 *         type: date
 *         description: minimum date "yyyy-mm-dd"
 *       - in: query
 *         name: endDate
 *         type: date
 *         description: maximum "yyyy-mm-dd"
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       start:
 *                         type: date
 */
 router.get('/', asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query

    if (!startDate || !endDate)
        return res.status(400).json({ message: 'missing fields in body' })

    const events = await sproc('GetEvents', [startDate, endDate], false)
    res.json({
        events 
    })
}))

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: delete an event
 *     tags:
 *       - "Events"
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         description: id of event
 *     responses:
 *       200:
 *         description: ok
 */
 router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).json({ message: 'missing id param in path' })
    
    await sproc('DeleteEvent', [id])

    res.sendStatus(200)
}))

module.exports = router
"use strict"
const { Router, application } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')
const Auth = require('../middleware/auth.js')

const router = Router()

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: get questions
 *     tags:
 *       - "Questions"
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
 *                       user_id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       posted_at:
 *                         type: date
 */
router.get('/', asyncHandler(async (req, res) => {
    const results = await sproc('GetQandA')

    res.json({ QandA: results })
}))

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: remove answer from question
 *     tags:
 *       - "Questions"
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *     responses:
 *       200:
 *         description: success
 */
 router.delete('/:id', Auth.isAdmin, asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id)
        return res.status(400).json({ message: 'missing fields in path' })

    await sproc('RemoveAnswer', [id])

    res.sendStatus(200)
}))

/**
 * @swagger
 * /questions/toanswer:
 *   get:
 *     summary: get questions
 *     tags:
 *       - "Questions"
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       answer:
 *                         type: string
 *                       posted_at:
 *                         type: date
 */
 router.get('/toanswer', Auth.isAdmin, asyncHandler(async (req, res) => {
    const results = await sproc('GetQuestions')

    res.json({ questions: results })
}))

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: ask question
 *     tags:
 *       - "Questions"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: success
 */
router.post('/', asyncHandler(async (req, res) => {
    const { user_id, content } = req.body
    
    if (!content || !user_id)
        return res.status(400).json({ message: 'missing fields in body' })

    await sproc('AskQuestion', [user_id, content])

    res.sendStatus(201)
}))

/**
 * @swagger
 * /questions/{id}/answer:
 *   post:
 *     summary: ask question
 *     tags:
 *       - "Questions"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         description: post id
 *     responses:
 *       201:
 *         description: success
 */
router.post('/:id/answer', Auth.isAdmin, asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const { id } = req.params;

    if (!answer || !id)
        return res.status(400).json({ message: 'missing fields in body or path' })

    await sproc('AnswerQuestion', [id, answer])

    res.sendStatus(201)
}))

module.exports = router;
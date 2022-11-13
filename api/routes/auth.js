"use strict"
const { Router } = require('express')
const { asyncHandler } = require('../middleware/errors.js')
const { sproc } = require('../config/mysql.js')
const Auth = require('../middleware/auth.js')
const bcrypt = require('bcrypt')

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user and get session cookie
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Missing fields in body
 *       401:
 *         description: Incorrect credentials
 */
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ message: 'missing fields in body' })

    const result = await sproc('Login', [email], true)

    if (!result || !await bcrypt.compare(password, result.password))
        return res.status(401).json({ message: 'Incorrect credentials' })

    req.session.userId = result.id // create session for user
    req.session.roles = (await sproc('GetRoles', [req.session.userId])).map(r=>r.name)
    res.json({
        id: result.id,
        message: `Logged in as ${email}`,
        roles: req.session.roles
    })
}))

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: logout user and clear session cookie
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/logout', (req, res) => {
    if (req.session)
        req.session.destroy()

    res.json({ message: "Logged out" })
})

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: register and login user
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Missing fields in body
 *       409:
 *         description: Email already in use
 */
router.post('/register', asyncHandler(async (req, res) => {
    const { email, fName, lName, password } = req.body

    if (!email || !fName || !lName || !password)
        return res.status(400).json({ message: 'Missing fields in body' })
    
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await sproc('Register', [email, fName, lName, hashedPassword], true)

    if (!result.success)
        return res.status(409).json({ message: result.message })

    req.session.userId = result.userId // create session for user
    req.session.roles = (await sproc('GetRoles', [req.session.userId])).map(r=>r.name)
    res.status(201).json({
        id: result.userId,
        message: `Create user for ${email}`,
        roles: req.session.roles
    })
}))

/**
 * @swagger
 * /auth/protected:
 *   post:
 *     summary: check if current user is logged in
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: Logged in
 *       401:
 *         description: Logged out
 */
router.post('/protected', Auth.protect, asyncHandler(async (req, res) => {
    res.json({
        message: 'Authorized',
        roles: req.session.roles
    })
}))

/**
 * @swagger
 * /auth/admin:
 *   post:
 *     summary: check if current user is an admin
 *     tags:
 *       - "Auth"
 *     responses:
 *       200:
 *         description: Is admin
 *       401:
 *         description: Logged out
 *       403:
 *         description: Not admin
 */
 router.post('/admin', Auth.isAdmin, asyncHandler(async (req, res) => {
    res.json({
        message: 'You are an admin',
        roles: req.session.roles
    })
}))

// TODO: assign roles
// TODO: revoke roles

module.exports = router
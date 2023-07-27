const { register, login, deleteUser } = require("../controllers/auth.js")
const { createFortune, getFortune } = require("../controllers/fortune.js")
const express = require('express')
const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/deleteuser', deleteUser)
router.post('/createfortune', createFortune)
router.post('/getfortune', getFortune)
module.exports = router
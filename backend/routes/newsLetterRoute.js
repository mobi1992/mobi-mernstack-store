const express = require('express')
const { createNewsLetter } = require('../controllers/newsLetterController/createNewsLetter')
const { auth, authorizedRole } = require('../middleware/authorize')
const router = new express.Router()


router.post('/create/newsLetter', createNewsLetter)

module.exports = router
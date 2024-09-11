const express = require('express')
const {handelGenerateNewShortURL,
    handleGetAnalytics,
} = require('../controllers/url') 
const router = express.Router()

router.post('/',handelGenerateNewShortURL)

router.get('./analytics/:shortId',handleGetAnalytics)


module.exports = router;
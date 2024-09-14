const express = require('express');
const URL = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allurls = await URL.find({}); // Await the result of the async operation
        return res.render('home', {
            urls: allurls,  // Now 'urls' will be the actual array of URLs
        });
    } catch (error) {
        console.error('Error fetching URLs:', error);
        return res.status(500).send('Server error');
    }
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport')
const mainController = require('../controllers/main.controller');
const request = require('request');

const IMAGES_JSON_URL = 'https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/refs/heads/main/static/images.json'

router.get('/', mainController.index);

router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), mainController.authSteam);

router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), mainController.authSteamReturn);

router.get('/api/logout', mainController.destroySession)

router.get('/api/delete', mainController.deleteAccount)

router.get('/api/images-map', (req, res) => {
    request.get(IMAGES_JSON_URL, (error, response, body) => {
        if (error) {
            return res.status(502).json({ error: 'Failed to fetch images.json from upstream' });
        }

        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send(body);
        }

        try {
            const json = JSON.parse(body);
            res.json(json);
        } catch (e) {
            res.status(500).json({ error: 'Failed to parse images.json from upstream' });
        }
    });
});

module.exports = router;
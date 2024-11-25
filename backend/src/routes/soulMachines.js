// In your Express backend (soulMachines.js route file)
const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
    res.json({
        apiKey: process.env.SOULMACHINES_API_KEY,  // API key from env variables
        position: 'bottomRight',
        greeting: 'Welcome',
        layout: 'fullFrame',
        profilePicture: 'https://assets.cdn.soulmachines.cloud/AvatarCoverImages/image-sam-l.jpg'
    });
});

module.exports = router;

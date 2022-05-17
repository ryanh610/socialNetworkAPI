const router = require('express').Router();
const api = require('./api');

router.use('/api', api);

router.use((req, res) => res.send('Invalid path'));

module.exports = router;
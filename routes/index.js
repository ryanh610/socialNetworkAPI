const router = require('express').router;
const api = require('./api');

router.use('./api', api);

router.use((req, res) => res.send('Invalid path'));

module.exports = router;
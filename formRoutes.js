const express = require('express');
const{handlePartnership} = require('./formController');

const router = express.Router();

router.post('/contact-partnership', handlePartnership);
router.post('/contact-tender', handlePartnership);

module.exports = router;
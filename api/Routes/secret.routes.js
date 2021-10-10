const express = require('express');
const secretControllers = require('../Controllers/secret.controllers');
const validateSecretData = require('../Middlewares/validateSecretData.middleware');
const validateHash = require('../Middlewares/validateHash.middleware');

const router = express.Router();

router.get('/secret/:hash', validateHash,secretControllers.getSecret);

router.post('/secret', validateSecretData,secretControllers.createSecret);

module.exports = router;
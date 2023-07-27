const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.homePage);

router.get('/register', userController.registerPage);

router.get('/login', userController.loginPage);

router.get('/submit', userController.submitPage);

router.get('/secrets', userController.secretsPage);

router.post('/register', userController.registerPost);

router.post('/login', userController.loginPost);

module.exports = router;

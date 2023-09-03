const express = require('express')
const { BodyObject,LogIn_bodyObject} = require('../controller/authControllers')
router = express.Router()

const authControllers= require('../controller/authControllers.js')

router.route('/signup')
.post(BodyObject.checkValidity(),authControllers.createAccount_POST)

router.route('/login')
.post(LogIn_bodyObject.checkValidity(),authControllers.logIn_POST)

module.exports = router 
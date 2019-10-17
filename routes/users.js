const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jwt')

const User = require('../models/User')
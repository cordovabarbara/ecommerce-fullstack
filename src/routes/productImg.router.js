const express = require('express');
const { create } = require('../controllers/productImg.controllers') 
const upload = require('../utils/multer'); 

const imageRoutes = express.Router();

imageRoutes.route('/')
.get(getAll)
    .post(upload.single('image'), create);
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const fileController = require('../controllers/fileController');

const router = express.Router();
const upload = multer();

router.post('/upload', auth, upload.single('file'), fileController.uploadFile);
router.get('/', auth, fileController.getFiles);

module.exports = router;

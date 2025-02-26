const express = require('express');
const { uploadFile, getFiles, downloadFile, deleteFile,viewImage } = require('../controllers/fileController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getFiles);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:filename', downloadFile);
router.delete('/files/:id', deleteFile);
router.get('/image/:filename', viewImage); 

module.exports = router;

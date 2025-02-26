const streamifier = require('streamifier');
const { getGfsBucket } = require('../config/gridFs');
const mongoose = require('mongoose');

const uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const gfsBucket = getGfsBucket();
        const filename = req.file.originalname;

        const uploadStream = gfsBucket.openUploadStream(filename, {
            contentType: req.file.mimetype,
        });

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

        await new Promise(resolve => uploadStream.on('finish', resolve));

        res.redirect('/');
    } catch (error) {

        res.status(500).json({ error: 'Upload error' });
        console.error(error);
        
    }
};

const getFiles = async (req, res) => {
    try {
        const files = await mongoose.connection.db.collection('uploads.files').find().toArray();
        if (!files.length) return res.render('index', { files: false });

        files.forEach(file => (file.isImage = file.contentType.includes('image')));
        res.render('index', { files });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
};

const downloadFile = async (req, res) => {
    try {
        const gfsBucket = getGfsBucket();
        const file = await mongoose.connection.db.collection('uploads.files').findOne({ filename: req.params.filename });

        if (!file) return res.status(404).json({ error: 'File not found' });

        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': `attachment; filename="${file.filename}"`,
        });

        gfsBucket.openDownloadStream(file._id).pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
};

const deleteFile = async (req, res) => {
    try {
        const gfsBucket = getGfsBucket();
        const fileId = new mongoose.Types.ObjectId(req.params.id);

        // Delete file
        await gfsBucket.delete(fileId);


        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
};

const viewImage = async (req, res) => {
    try {
        const gfsBucket = getGfsBucket();
        const file = await mongoose.connection.db.collection('uploads.files').findOne({ filename: req.params.filename });

        if (!file || !file.contentType.includes('image')) {
            return res.status(404).json({ error: 'Not an image or file does not exist' });
        }

        res.set('Content-Type', file.contentType);

        gfsBucket.openDownloadStream(file._id).pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.error(error);
    }
};

module.exports = { uploadFile, getFiles, downloadFile, deleteFile , viewImage};

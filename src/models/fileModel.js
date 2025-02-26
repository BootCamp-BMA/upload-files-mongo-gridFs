const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    uploadDate: Date,
});

module.exports = mongoose.model('File', FileSchema, 'uploads.files');

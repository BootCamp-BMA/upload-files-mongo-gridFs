const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gfsBucket;

const initGridFS = (conn) => {
    if (!conn || !conn.db) {
        throw new Error("MongoDB connection is not ready");
    }
    gfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
    console.log('GridFS initialized');
};

const getGfsBucket = () => {
    if (!gfsBucket) {
        throw new Error("GridFSBucket has not been initialized");
    }
    return gfsBucket;
};

module.exports = { initGridFS, getGfsBucket };

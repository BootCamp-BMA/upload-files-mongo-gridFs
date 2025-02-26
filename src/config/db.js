const mongoose = require('mongoose');
const { initGridFS } = require('./gridFs');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected...');
        
        // Initialize GridFS after connection is ready
        initGridFS(mongoose.connection);

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

# File Upload System with MongoDB GridFS

This project is a file upload system built using Node.js, Express, and MongoDB GridFS. It allows users to upload, view, download, and delete files stored in a MongoDB database. The system supports all file types and provides special handling for images.

## Features:
- Upload files using a web interface.
- Store files in MongoDB using GridFS.
- View a list of uploaded files.
- Download files.
- Delete files.

## Project Structure:
- `server.js` - Main entry point for the application.
- `src/app.js` - Initializes Express and middleware.
- `src/config/db.js` - MongoDB connection setup.
- `src/config/gridFs.js` - GridFS configuration for file storage.
- `src/controllers/fileController.js` - Handles file operations (upload, fetch, download, delete).
- `src/middleware/uploadMiddleware.js` - Middleware for handling file uploads.
- `src/models/fileModel.js` - Mongoose schema for files.
- `src/routes/fileRoutes.js` - Defines API routes for file operations.
- `src/views/index.ejs` - Frontend for file uploads and management.

## Installation:
1. Clone the repository:
git clone https://github.com/BootCamp-BMA/upload-files-mongo-gridFs.git cd upload-files-mongo-gridFs

markdown
Copy
Edit
2. Install dependencies:
npm install

markdown
Copy
Edit
3. Set up environment variables:
- Create a `.env` file (based on `.env.example`) with the required MongoDB connection details.
4. Start the server:
npm start

markdown
Copy
Edit

## API Endpoints:
- `POST /upload` - Uploads a file.
- `GET /files` - Retrieves all uploaded files.
- `GET /files/:filename` - Fetches a file by name.
- `GET /download/:filename` - Downloads a file.
- `DELETE /files/:id` - Deletes a file.

## Technologies Used:
- Node.js
- Express.js
- MongoDB + GridFS
- Multer (for handling file uploads)
- EJS (for rendering frontend)

## License:
This project is open-source. Feel free to use and modify it.
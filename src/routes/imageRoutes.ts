
import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/imageController'; 

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Using the original file name
    },
});

// Creating a multer instance with the defined storage
const upload = multer({ storage });

// Defining the upload route
router.post('/upload', upload.single('image'), uploadImage); // Using multer to handle file upload

export default router;


import { Request, Response } from 'express';

export const uploadImage = (req: Request, res: Response): void => {
    if (!req.file) {
        res.status(400).json({ error: 'Failed to upload image' });
        return; // Early return, no need to return anything
    }

    
    res.status(200).json({
        message: 'Image uploaded successfully',
        filePath: req.file.path, // path to the uploaded file
    });
    
};

import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

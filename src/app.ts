import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import questionRoutes from './routes/questionRoutes';

dotenv.config();


const app = express();
app.use(express.json());
app.use('/api/images', imageRoutes);
app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in the environment variables.');
    process.exit(1); // Exit the application if MONGO_URI is not set
}

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the application if the connection fails
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);
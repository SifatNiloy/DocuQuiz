import mongoose, { Document } from 'mongoose';

export interface IImage extends Document {
  imageUrl: string;
  extractedText: string;
}

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  extractedText: { type: String, required: false },
});

const Image = mongoose.model<IImage>('Image', imageSchema);
export default Image;

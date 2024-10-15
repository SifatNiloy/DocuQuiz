import mongoose, { Document } from 'mongoose';

export interface IQuestion extends Document {
  question: string;
  answer: string;
  correctAnswer: string;
  feedback: string;
  rating: number;
}

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: false },
  correctAnswer: { type: String, required: false },
  feedback: { type: String, required: false },
  rating: { type: Number, required: false },
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);
export default Question;

import { Request, Response, RequestHandler } from 'express';
import Question, { IQuestion } from '../models/questionModel';

// Function to create questions
export const createQuestions: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { question, correctAnswer, feedback, rating } = req.body;

        // Creating a new question instance
        const newQuestion: IQuestion = new Question({
            question,
            correctAnswer,
            feedback,
            rating,
        });

        // Saving the question to the database
        await newQuestion.save();

        res.status(201).json({
            message: 'Question created successfully',
            question: newQuestion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating question' });
    }
};

// Function to submit an answer and get feedback
export const submitAnswer: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { questionId, answer } = req.body;

        // Find the question by ID
        const question: IQuestion | null = await Question.findById(questionId);

        if (!question) {
            res.status(404).json({ message: 'Question not found' });
            return;
        }

        // Here you would call your LLM to evaluate the answer
        const evaluation = await evaluateAnswer(question.correctAnswer, answer); // Assuming evaluateAnswer is defined

        const rating = evaluation.rating;
        const correctAnswer = question.correctAnswer;
        const feedback = evaluation.feedback;

        // Update the question with the user's answer, rating, and feedback
        question.answer = answer;
        question.rating = rating;
        question.feedback = feedback;

        // Save the updated question
        await question.save();

        res.status(200).json({
            message: 'Answer submitted successfully',
            rating,
            correctAnswer,
            feedback,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting answer' });
    }
};

// Function to evaluate the answer - Example placeholder function
async function evaluateAnswer(correctAnswer: string, userAnswer: string) {
    // Logic for evaluating the answer, e.g., using an LLM API
    // Return a mock evaluation for now
    const rating = userAnswer === correctAnswer ? 10 : 0; // Simple evaluation
    const feedback = userAnswer === correctAnswer ? 'Correct!' : 'Incorrect, try again.';

    return { rating, feedback };
}

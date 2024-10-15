import { Router } from 'express';
import { createQuestions, submitAnswer } from '../controllers/questionController';

const router = Router();

router.post('/create', createQuestions);
router.post('/submit', submitAnswer);

export default router;

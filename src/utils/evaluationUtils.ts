export const parseEvaluation = (evaluation: string): [number, string, string] => {
    // Example implementation for now
    const parts = evaluation.split(';');
    const rating = parseFloat(parts[0]);
    const correctAnswer = parts[1];
    const feedback = parts[2];
    return [rating, correctAnswer, feedback];
};
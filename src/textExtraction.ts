import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageUrl: string): Promise<string> => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng');
    return text;
  } catch (error) {
    throw new Error(`Error extracting text: ${error}`);
  }
};

import dotenv from 'dotenv';
import { pythonBridge } from 'python-bridge'; 

dotenv.config();

// Creating a Python bridge instance
const python = pythonBridge();  // Calling pythonBridge as a function here

// Asynchronous function to import the ChatOpenAI class
const importLangChain = async (apiKey: string): Promise<void> => {
    await python.ex`
        from langchain_openai import ChatOpenAI

        chat_openai = ChatOpenAI(model_name='gpt-3.5-turbo', openai_api_key='${apiKey}')
    `;
};

// Creating an instance of ChatOpenAI using GPT-3.5-turbo
let openai: any | null = null; // Initially set to null

(async () => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not defined in the environment variables.");
        }
        await importLangChain(apiKey); // Import and create instance
        openai = true; // Setting openai to a truthy value after import
    } catch (error) {
        console.error("Error initializing OpenAI client:", error);
    }
})();

// Function to generate questions
export const generateQuestions = async (context: string, n: number) => {
    if (!openai) {
        throw new Error("OpenAI client is not initialized");
    }

    const prompt = `Generate ${n} questions based on the following context: ${context}`;

    // ChatOpenAI to generate questions
    const response = await python`
        chat_openai.predict([{"role": "user", "content": ${prompt}}])[0]['choices'][0]['content']
    `;

    return response;
};

// Function to evaluate answers
export const evaluateAnswer = async (question: string, userAnswer: string) => {
    if (!openai) {
        throw new Error("OpenAI client is not initialized");
    }

    const prompt = `Evaluate the following answer to the question "${question}". 
    Rate it from 0-10, provide feedback, and the correct answer. Answer: "${userAnswer}"`;

    const response = await python`
        chat_openai.predict([{"role": "user", "content": ${prompt}}])[0]['choices'][0]['content']
    `;
    
    return response;
};

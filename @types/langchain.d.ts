declare module 'langchain/llms/openai' {
    export class OpenAI {
        constructor(options: any);
        
        predict(input: string): Promise<string>;
    }
}

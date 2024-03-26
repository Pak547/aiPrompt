require('dotenv').config();
const { OpenAI } = require('langchain/llms/openai');

const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY,
    // represents the temperature of the model, higher values will generate more creative responses
    // ranges from 0-1, default is 0.5, 0 meaning the model will be deterministic and 1 meaning the model will be very creative 
    temperature: 0,
    model: 'gpt-3.5-turbo'
  });
  
  console.log({ model });

  const promptFunc = async () => {
    try {
        const res = await model.call("How do you capitalize all characters of a string in JavaScript?");
        console.log(res);
      }
      catch (err) {
        console.error(err);
      }
  };
  
  promptFunc();
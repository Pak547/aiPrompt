// dependencies
const { OpenAI } = require('langchain/llms/openai');
const inquirer = require('inquirer');
require('dotenv').config();
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  // temperature defaults to 0.5
  // set to 0 for deterministic results
  // set to 1 for more randomness
  // range is 0-1
  temperature: 0,
  model: 'gpt-3.5-turbo'
});

// Uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
const promptFunc = async (input) => {
  try {
    const res = await model.call(input);
    console.log(res);
  }
  catch (err) {
    console.error(err);
  }
};

// Initialization function that uses inquirer to prompt the user and returns a promise. It takes the user input and passes it through the call method
const init = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Ask a coding question:',
    },
  ]).then((inquirerResponse) => {
    promptFunc(inquirerResponse.name)
  });
};

// Calls the initialization function and starts the script
init();

// Instantiation of a new object called "prompt" using the "PromptTemplate" class
const prompt = new PromptTemplate({
    template: "You are a javascript expert and will answer the user’s coding questions thoroughly as possible.\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  });

  // Calls the "format" method on the "prompt" object and passes in the user input
  // format method returns a promise that resolves to the formatted string
  const promptInput = await prompt.format({
    question: input,
  });

  // With a `StructuredOutputParser` we can define a schema for the output.
const parser = StructuredOutputParser.fromNamesAndDescriptions({
    code: "Javascript code that answers the user's question",
    explanation: "detailed explanation of the example code provided",
});
const formatInstructions = parser.getFormatInstructions();

console.log(await parser.parse(res));
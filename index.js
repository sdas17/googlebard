const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Initialize the GoogleGenerativeAI with the API key
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generate = async (question) => {
    try {
      const prompt = question;
      const result = await geminiModel.generateContent(prompt);
      const response = result.response;
      console.log(response.text());
      return response.text();
    } catch (error) {
      console.log("response error", error);
    }
  };
//   var question = "what is the value of pie in maths ?";

// generate(question);

app.post('/api/content', async (req, res) => {
  
    let data = req.body.question;
    var result = await generate(data);
    console.log(result);
    res.json({"result" : result});
})


// Start the server on the specified port, with a fallback default port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

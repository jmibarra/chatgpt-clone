// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { request, response } = require("express");

require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = 3080;

app.post('/', async (req, res) => {

    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${message}` }]
        });

        res.json({
            message: response.data.choices[0].message.content
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: `Ha ocurrido un error al procesar la solicitud: Error ${response.status} - ${response.statusText} `
        });
    }
})


app.listen(port, () => {
    console.log("Se levanta en el puerto " + port)
})






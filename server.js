require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Простой прокси для ИИ-запросов (без промптов)
app.post('/api/generate', async (req, res) => {
  const { prompt, systemMessage = "You are a helpful assistant." } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const requestConfig = {
      url: process.env.AI_API_URL,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      }
    };
    if (process.env.PROXY_ENABLED === 'true') {
      requestConfig.proxy = { host: new URL(process.env.PROXY_URL).hostname, port: new URL(process.env.PROXY_URL).port };
    }
    const response = await axios(requestConfig);
    res.json({ result: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`AI-Button server running on port ${PORT}`);
});

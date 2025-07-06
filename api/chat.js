// Vercel Serverless Function for AI Chat
export default async function handler(req, res) {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // 模擬 AI 回應（您可以替換為真實的 AI API）
        const aiResponses = [
            "🤔 這是個很有趣的問題！讓我為您詳細解答...",
            "💡 根據您的問題，我建議您可以考慮以下幾個方向...",
            "🎯 我理解您的需求，這裡有一些實用的建議...",
            "✨ 很高興能為您服務！關於這個問題...",
            "🚀 讓我為您提供一個全面的解決方案...",
            "📊 基於數據分析，我認為最佳的方法是...",
            "🌟 這確實是一個值得深入探討的話題...",
            "💼 從專業角度來看，我建議您...",
            `關於"${message}"，我認為這個問題很有意思。讓我為您提供一些見解...`,
            `針對您提到的"${message}"，我建議您可以從以下幾個角度來思考...`
        ];

        // 模擬處理時間
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

        res.status(200).json({
            response: randomResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: '抱歉，AI 暫時無法回應，請稍後再試。'
        });
    }
}

// 如果要使用真實的 OpenAI API，請取消註釋以下代碼：
/*
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一個友善的AI助手，請用繁體中文回答問題。"
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    
    res.status(200).json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: '抱歉，AI 暫時無法回應，請稍後再試。'
    });
  }
}
*/
// not works :- 
// const fetch = require('node-fetch');

// class DeepseekAdapter {
//   constructor(apiKey) {
//     this.apiKey = apiKey;
//     this.baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
//   }

//   async chat(messages) {
//     const payload = {
//       model: 'deepseek/deepseek-chat-v3-0324:free',
//       messages: messages.map(msg => ({
//         role: msg.role,
//         content: msg.content,
//       })),
//       temperature: 0.7,
//       max_tokens: 1000,
//     };
//     const res = await fetch(this.baseUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${this.apiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     const data = await res.json();
//     return data.choices[0]?.message?.content || 'No response.';
//   }
// }

// module.exports = { DeepseekAdapter };

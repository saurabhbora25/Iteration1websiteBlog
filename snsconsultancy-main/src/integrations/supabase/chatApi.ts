const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function sendChatPrompt(prompt: string, apiKey: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${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}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Request failed');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}


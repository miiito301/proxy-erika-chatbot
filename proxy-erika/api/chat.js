export default async function handler(req, res) {
  // CORS許可ヘッダーを付与
  res.setHeader('Access-Control-Allow-Origin', '*'); // すべてのオリジンを許可（必要に応じて限定可能）
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // プリフライトリクエストのレスポンスは204でOK
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { messages } = req.body;

  // ここは元のAPI処理を続ける
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages,
      temperature: 1,
    }),
  });

  const data = await response.json();
  return res.status(200).json(data);
}

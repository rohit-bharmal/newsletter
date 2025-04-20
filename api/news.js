export default async function handler(req, res) {
  const apiKey = process.env.VITE_APP_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}

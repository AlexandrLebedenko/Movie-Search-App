export default async function handler(req, res) {
  const { t } = req.query;
  const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${encodeURIComponent(t)}`);
  const data = await response.json();
  res.status(200).json(data);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const response = await fetch('https://script.google.com/macros/s/AKfycbzaKXI5ZS0st9pGVqscycVnfa8WfYC6L74J3EWp-8Nv-wjuCLkH8isdxRYfWcoGg9uDqw/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Erreur côté Google Script' });
  }

  const text = await response.text();
  res.status(200).send(text);
}

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      res.status(200).json({ valid: true, decoded });
    } catch (error) {
      res.status(401).json({ valid: false, error: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

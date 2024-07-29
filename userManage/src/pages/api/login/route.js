import supabase from '@/lib/supabase';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const { data: result, error } = await supabase
        .from('admin')
        .select('*')
        .eq('username', username);

      if (error) throw error;

      if (result.length === 0 || !await bcrypt.compare(password, result[0].password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: result[0].id, role: result[0].role,email:result[0].email,username:result[0].username }, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

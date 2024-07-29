// pages/api/getAllAdmins.js
import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data: admins, error } = await supabase
        .from('admin')  // 假设用户数据在 'admin' 表中
        .select('username, role, created_at,email,id');

      if (error) throw error;

      res.status(200).json({ admins });
    } catch (error) {
      console.error('Error fetching admins:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

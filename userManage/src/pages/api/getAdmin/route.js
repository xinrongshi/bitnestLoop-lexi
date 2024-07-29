import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const { data: result, error } = await supabase
        .from('admin')
        .select('*')
        .eq('id', id);

      if (error) throw error;

      if (result.length !== 0) {
        res.status(200).json({
          user: result[0],
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

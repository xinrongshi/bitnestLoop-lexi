import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    try {
      const { data, error } = await supabase
        .from('records')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.status(200).json({ message: 'Record deleted successfully', record: data });
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.rpc('get_daily_transactions');

      if (error) throw error;

      // Filter to get last 7 days
      const last7Days = data.filter((record, index) => index < 7);

      res.status(200).json({ transactions: last7Days });
    } catch (error) {
      console.error('Error fetching daily transactions:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

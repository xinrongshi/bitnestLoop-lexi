import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const thisWeekStart = new Date();
      thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
      const lastWeekStart = new Date(thisWeekStart);
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);

      const thisWeekData = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'withdrawn')
        .gte('start_time', thisWeekStart.toISOString());

      const lastWeekData = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'withdrawn')
        .gte('start_time', lastWeekStart.toISOString())
        .lt('start_time', thisWeekStart.toISOString());

      const thisWeekTotal = thisWeekData.data.reduce((acc, record) => acc + record.amount, 0);
      const lastWeekTotal = lastWeekData.data.reduce((acc, record) => acc + record.amount, 0);

      res.status(200).json({ thisWeekTotal, lastWeekTotal });
    } catch (error) {
      console.error('Error fetching weekly withdrawals:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

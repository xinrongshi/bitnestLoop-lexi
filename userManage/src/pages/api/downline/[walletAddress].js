import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  const { walletAddress } = req.query;

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.rpc('get_downline', { referrer_wallet_address: walletAddress });

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

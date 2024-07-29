import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, referrer_wallet_address, wallet_address, created_at } = req.body;

    if (!id || !referrer_wallet_address || !wallet_address || !created_at) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const { data, error } = await supabase
        .from('referrals')
        .update({
          referrer_wallet_address,
          wallet_address,
          created_at: new Date(created_at).toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      res.status(200).json({ message: 'Referral updated successfully', referral: data });
    } catch (error) {
      console.error('Error updating referral:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

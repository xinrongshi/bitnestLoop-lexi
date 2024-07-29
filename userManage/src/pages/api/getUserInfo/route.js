import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { account } = req.query;

    if (!account) {
      return res.status(400).json({ message: 'Account is required' });
    }

    try {
      // Fetch user details
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('account', account)
        .single();

      if (userError) throw userError;

      // Fetch referral details
      const { data: referrals, error: referralsError } = await supabase.rpc('get_downline', { referrer_wallet_address: account });

      if (referralsError) throw referralsError;

      // Count level 1, 2, and 3 referrals
      const level_1_count = referrals.filter(referral => referral.level === 1).length;
      const level_2_count = referrals.filter(referral => referral.level === 2).length;
      const level_3_count = referrals.filter(referral => referral.level === 3).length;

      // Fetch records details
      const { data: records, error: recordsError } = await supabase
        .from('records')
        .select('*')
        .eq('user_address', account);

      if (recordsError) throw recordsError;

      const team_total_recharge = records.reduce((sum, record) => sum + (record.amount || 0), 0);
      const personal_total_recharge = records.filter(record => record.status === 'deposit').reduce((sum, record) => sum + (record.amount || 0), 0);
      const personal_recharge_count = records.length;
      const total_withdrawal = records.filter(record => record.status === 'withdrawn').reduce((sum, record) => sum + (record.amount || 0), 0);

      // Send the combined data as a response
      res.status(200).json({
        user: {
          ...user,
          level_1_count,
          level_2_count,
          level_3_count,
          team_total_recharge,
          personal_total_recharge,
          personal_recharge_count,
          total_withdrawal,
        },
        referrals,
        records,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

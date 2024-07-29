import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { account, invite_code, agent_type, balance, city, notes } = req.body;

    if (!account) {
      return res.status(400).json({ message: 'Account is required' });
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          invite_code,
          agent_type,
          balance,
          city,
          notes,
        })
        .eq('account', account);

      if (error) throw error;

      res.status(200).json({ message: 'User updated successfully', user: data });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

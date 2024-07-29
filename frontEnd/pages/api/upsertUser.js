import supabase from './supabase'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { account, invite_code, agent_type, balance, city, notes,last_accessed_at } = req.body;

    if (!account) {
      return res.status(400).json({ message: 'Account is required' });
    }
    if (!last_accessed_at) {
      last_accessed_at = new Date().toISOString();
    }
    
    try {
      // 尝试查找用户
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('account')
        .eq('account', account)
        .single();

      // 如果查找出错且不是用户不存在的错误，抛出错误
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      let data, error;

      if (existingUser) {
        // 更新用户信息
        ({ data, error } = await supabase
          .from('users')
          .update({
            invite_code,
            agent_type,
            balance,
            city,
            notes,
            last_accessed_at
          })
          .eq('account', account));
      } else {
        // 插入新用户
        ({ data, error } = await supabase
          .from('users')
          .insert([
            {
              account,
              invite_code,
              agent_type,
              balance,
              city,
              notes
            }
          ]));
      }

      if (error) throw error;

      res.status(200).json({ message: existingUser ? 'User updated successfully' : 'User added successfully', user: data });
    } catch (error) {
      console.error('Error upserting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import supabase from '@/lib/supabase';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, username, email, role } = req.body;
    console.log('req.body:', req.body);

    // 检查请求体中的必需字段
    if (!id || (!username && !email  && role)) {
      return res.status(400).json({ message: 'ID and at least one field to update are required' });
    }

    try {
      // 检查ID是否存在
      const { data: existingUser, error: checkError } = await supabase
        .from('admin')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError; // PGRST116: No rows found
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('existingUser:', existingUser); // 确认用户存在

      // 更新用户信息
      const updates = {};
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (role) updates.role = role;

      const { data: result, error: updateError } = await supabase
        .from('admin')
        .update(updates)
        .eq('id', id)
        .select('*'); // 确保更新后返回更新的数据

      if (updateError) throw updateError;

      console.log('result:', result); // 确认更新操作返回的数据

      res.status(200).json({ message: 'User updated successfully', user: result });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

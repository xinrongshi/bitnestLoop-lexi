import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    // 检查请求体中的必需字段
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    try {
      // 检查ID是否存在
      const { data: existingUser, error: checkError } = await supabase
        .from('admin')
        .select('*')
        .eq('id', id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError; // PGRST116: No rows found
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // 从数据库删除用户
      const { data: result, error } = await supabase
        .from('admin')
        .delete()
        .eq('id', id);

      if (error) throw error;

      res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

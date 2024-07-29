import supabase from '@/lib/supabase';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // 检查邮箱是否已存在
      const { data: existingEmail, error: emailCheckError } = await supabase
        .from('admin')
        .select('email')
        .eq('email', email)
        .single();

      if (emailCheckError && emailCheckError.code !== 'PGRST116') throw emailCheckError; // PGRST116: No rows found
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // 检查用户名是否已存在
      const { data: existingUsername, error: usernameCheckError } = await supabase
        .from('admin')
        .select('username')
        .eq('username', username)
        .single();

      if (usernameCheckError && usernameCheckError.code !== 'PGRST116') throw usernameCheckError; // PGRST116: No rows found
      if (existingUsername) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      // 加密密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 向数据库插入新用户，身份默认普通用户
      const { data: result, error } = await supabase
        .from('admin')
        .insert({ username, email, password: hashedPassword, role: "user" });

      if (error) throw error;

      res.status(201).json({ message: 'User added successfully', user: result });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

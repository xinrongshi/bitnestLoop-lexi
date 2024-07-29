import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_address, salesperson, amount, interest, period, start_time, end_time, order_id, status } = req.body;

    // 检查请求体中的必需字段
    if (!user_address || !salesperson || !amount || !interest || !period || !start_time || !end_time || !order_id || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // 将地址转换为小写
      const normalizedUserAddress = user_address.toLowerCase();
      const normalizedSalesperson = salesperson.toLowerCase();

      // 确保 start_time 和 end_time 是有效的 ISO 8601 格式字符串
      const normalizedStartTime = new Date(start_time).toISOString();
      const normalizedEndTime = new Date(end_time).toISOString();

      // 插入新的记录
      const { data, error } = await supabase
        .from('records')
        .insert([
          {
            user_address: normalizedUserAddress,
            salesperson: normalizedSalesperson,
            amount,
            interest,
            period,
            start_time: normalizedStartTime,
            end_time: normalizedEndTime,
            order_id,
            status
          }
        ]);

      if (error) throw error;

      res.status(201).json({ message: 'Record added successfully', record: data });
    } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

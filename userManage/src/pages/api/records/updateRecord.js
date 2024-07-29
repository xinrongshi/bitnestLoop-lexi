import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, user_address, salesperson, amount, interest, period, start_time, end_time, orderId, status } = req.body;

    // 检查请求体中的必需字段
    if (!id || !user_address || !salesperson || !amount || !interest || !period || !start_time || !end_time || orderId === undefined || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // 将地址转换为小写
      const normalizedUserAddress = user_address.toLowerCase();
      const normalizedSalesperson = salesperson.toLowerCase();
      const normalizedStartTime = new Date(start_time).toISOString();
      const normalizedEndTime = new Date(end_time).toISOString();

      const { data, error } = await supabase
        .from('records')
        .update({
          user_address: normalizedUserAddress,
          salesperson: normalizedSalesperson,
          amount,
          interest,
          period,
          start_time: normalizedStartTime,
          end_time: normalizedEndTime,
          orderId,
          status
        })
        .eq('id', id);

      if (error) throw error;

      res.status(200).json({ message: 'Record updated successfully', record: data });
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

import supabase from './supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_address, amount, interest, period, start_time, end_time,orderId,status } = req.body;

    // 检查请求体中的必需字段
    if (!user_address || !amount || !interest || !period || !start_time || !end_time || !orderId || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // 将 user_address 转换为小写
      const normalizedUserAddress = user_address.toLowerCase();

      // 根据 user_address 查找对应的 referrer_wallet_address，并统一转换为小写
      const { data: referralData, error: referralError } = await supabase
        .from('referrals')
        .select('referrer_wallet_address')
        .ilike('wallet_address', normalizedUserAddress);

      if (referralError) throw referralError;

      let salesperson;

      if (referralData.length === 0) {
        salesperson = normalizedUserAddress;
      } else if (referralData.length > 1) {
        return res.status(400).json({ message: 'Multiple salespersons found for this user address' });
      } else {
        salesperson = referralData[0].referrer_wallet_address.toLowerCase();
      }

      // 确保 start_time 和 end_time 是有效的 ISO 8601 格式字符串
      const normalizedStartTime = new Date(start_time).toISOString();
      const normalizedEndTime = new Date(end_time).toISOString();

      // 插入新的记录
      const { data, error } = await supabase
        .from('records')
        .insert([
          {
            user_address: normalizedUserAddress,
            salesperson,
            amount,
            interest,
            period,
            start_time: normalizedStartTime,
            end_time: normalizedEndTime,
            orderId,
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

import supabase from './supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { wallet_address, referrer_wallet_address } = req.body;

    try {
      // 将地址转换为小写
      const normalizedWalletAddress = wallet_address.toLowerCase();
      const normalizedReferrerWalletAddress = referrer_wallet_address ? referrer_wallet_address.toLowerCase() : null;

      // 检查用户是否已经有推荐人
      const { data: existingReferral, error: checkError } = await supabase
        .from('referrals')
        .select('referrer_wallet_address')
        .ilike('wallet_address', normalizedWalletAddress)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 indicates no row found
        throw checkError;
      }

      if (existingReferral) {
        if (existingReferral.referrer_wallet_address !== '0x') {
          // 用户已经有推荐人且推荐人不是0x，跳过插入操作
          res.status(200).json({ message: 'User already has a valid referrer' });
          return;
        } else {
          // 用户已经有推荐人且推荐人是0x，更新推荐人地址
          const { data: updateReferral, error: updateError } = await supabase
            .from('referrals')
            .update({ referrer_wallet_address: normalizedReferrerWalletAddress })
            .ilike('wallet_address', normalizedWalletAddress);

          if (updateError) throw updateError;

          res.status(200).json({ message: 'User referrer updated successfully' });
          return;
        }
      }

      // 如果没有提供 referrer_wallet_address，则设置为 wallet_address 自己
      const finalReferrerWalletAddress = normalizedReferrerWalletAddress || normalizedWalletAddress;

      // 插入新的推荐记录
      const { data: newReferral, error: referralError } = await supabase
        .from('referrals')
        .insert([
          { wallet_address: normalizedWalletAddress, referrer_wallet_address: finalReferrerWalletAddress },
        ]);

      if (referralError) throw referralError;

      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

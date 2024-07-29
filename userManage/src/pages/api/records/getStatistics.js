import supabase from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const startOfDay = today.toISOString();
      const endOfDay = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString();

      // 获取总充值金额
      const { data: totalDeposits, error: totalDepositsError } = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'deposit');

      if (totalDepositsError) throw totalDepositsError;

      const totalDepositAmount = totalDeposits.reduce((acc, record) => acc + record.amount, 0);

      // 获取总提现金额
      const { data: totalWithdrawals, error: totalWithdrawalsError } = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'withdrawn');

      if (totalWithdrawalsError) throw totalWithdrawalsError;

      const totalWithdrawalAmount = totalWithdrawals.reduce((acc, record) => acc + record.amount, 0);

      // 计算总留存
      const totalRetention = totalDepositAmount - totalWithdrawalAmount;

      // 获取正在参与数量
      const { data: activeInvestments, error: activeInvestmentsError } = await supabase
        .from('records')
        .select('id')
        .eq('status', 'deposit');

      if (activeInvestmentsError) throw activeInvestmentsError;

      const activeInvestmentCount = activeInvestments.length;

      // 获取当日入金
      const { data: todayDeposits, error: todayDepositsError } = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'deposit')
        .gte('start_time', startOfDay);

      if (todayDepositsError) throw todayDepositsError;

      const todayDepositAmount = todayDeposits.reduce((acc, record) => acc + record.amount, 0);

      // 获取当日提现
      const { data: todayWithdrawals, error: todayWithdrawalsError } = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'withdrawn')
        .gte('end_time', startOfDay);

      if (todayWithdrawalsError) throw todayWithdrawalsError;

      const todayWithdrawalAmount = todayWithdrawals.reduce((acc, record) => acc + record.amount, 0);

      // 获取今日新单（金额和数量）
      const { data: todayNewOrders, error: todayNewOrdersError } = await supabase
        .from('records')
        .select('amount')
        .eq('status', 'deposit')
        .gte('start_time', startOfDay);

      if (todayNewOrdersError) throw todayNewOrdersError;

      const todayNewOrderAmount = todayNewOrders.reduce((acc, record) => acc + record.amount, 0);
      const todayNewOrderCount = todayNewOrders.length;

      // 获取明日出金
      const { data: tomorrowWithdrawable, error: tomorrowWithdrawableError } = await supabase
        .from('records')
        .select('amount, interest')
        .eq('status', 'deposit')
        .lte('end_time', endOfDay);

      if (tomorrowWithdrawableError) throw tomorrowWithdrawableError;

      const tomorrowWithdrawableAmount = tomorrowWithdrawable.reduce((acc, record) => acc + record.amount + record.interest, 0);

      // 获取本周期出金
      const { data: currentCycleWithdrawals, error: currentCycleWithdrawalsError } = await supabase
        .from('records')
        .select('amount, interest')
        .eq('status', 'deposit')
        .lte('end_time', endOfDay); // assuming 'endOfDay' represents the end of the current cycle

      if (currentCycleWithdrawalsError) throw currentCycleWithdrawalsError;

      const currentCycleWithdrawalAmount = currentCycleWithdrawals.reduce((acc, record) => acc + record.amount + record.interest, 0);

      res.status(200).json({
        totalDepositAmount,
        totalWithdrawalAmount,
        totalRetention,
        activeInvestmentCount,
        todayDepositAmount,
        todayWithdrawalAmount,
        todayNewOrderAmount,
        todayNewOrderCount,
        tomorrowWithdrawableAmount,
        currentCycleWithdrawalAmount
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

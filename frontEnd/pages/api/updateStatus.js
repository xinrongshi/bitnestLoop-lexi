import supabase from './supabase';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { orderId, status } = req.body;

    if (orderId === undefined || !status) {
      return res.status(400).json({ message: 'Order ID and status are required' });
    }

    try {
      const { data, error } = await supabase
        .from('records')
        .update({ status })
        .eq('orderId', orderId);

      if (error) throw error;

      res.status(200).json({ message: 'Record status updated successfully', record: data });
    } catch (error) {
      console.error('Error updating record status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

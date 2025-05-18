import { db } from './lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { player, kode, type, amount } = req.body;

  if (!player || !kode || !type || !amount) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
  }

  try {
    await db.collection('redeem_codes').doc(player.toLowerCase()).set({
      kode,
      type,
      amount
    });
    res.json({ success: true, message: 'Kode berhasil ditambahkan.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menambahkan kode.', error: err.message });
  }
}

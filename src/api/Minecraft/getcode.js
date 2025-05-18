import { db } from '../lib/firebase';

export default async function handler(req, res) {
  const player = req.query.player?.toLowerCase();
  if (!player) {
    return res.status(400).json({ success: false, message: 'Parameter player kosong.' });
  }

  try {
    const doc = await db.collection('redeem_codes').doc(player).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Tidak ada kode untuk player ini.' });
    }

    const data = doc.data();
    await db.collection('redeem_codes').doc(player).delete(); // hapus setelah diambil
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil kode.', error: err.message });
  }
}

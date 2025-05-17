import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method tidak diizinkan.' });
  }

  const { player, kode, type, amount } = req.body;
  if (!player || !kode || !type || !amount) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
  }

  const filePath = path.resolve('./codes.json');
  let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

  data[player.toLowerCase()] = { kode, type, amount };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return res.json({ success: true, message: 'Kode berhasil ditambahkan.' });
}

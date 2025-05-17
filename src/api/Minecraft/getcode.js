import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const player = req.query.player?.toLowerCase();
  if (!player) {
    return res.status(400).json({ success: false, message: 'Player kosong.' });
  }

  const filePath = path.resolve('./codes.json');
  let data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

  if (data[player]) {
    const result = data[player];
    delete data[player];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.json({ success: true, data: result });
  } else {
    return res.json({ success: false, message: 'Tidak ada kode untuk player ini.' });
  }
}

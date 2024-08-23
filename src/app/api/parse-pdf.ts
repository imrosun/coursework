import type { NextApiRequest, NextApiResponse } from 'next';
import pdfParse from 'pdf-parse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const buffer = Buffer.from(file, 'base64');
      const data = await pdfParse(buffer);
      res.status(200).json({ text: data.text });
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

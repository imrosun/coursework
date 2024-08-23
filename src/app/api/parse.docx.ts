import type { NextApiRequest, NextApiResponse } from 'next';
import mammoth from 'mammoth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const buffer = Buffer.from(file, 'base64');
      const { value } = await mammoth.extractRawText({ buffer });
      res.status(200).json({ text: value });
    } catch (error) {
      res.status(500).json({ error: 'Failed to parse DOCX' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

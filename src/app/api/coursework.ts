import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { analyzedData } = req.body;
    localStorage.setItem('analyzedData', JSON.stringify(analyzedData));
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    const analyzedData = JSON.parse(localStorage.getItem('analyzedData') || '[]');
    res.status(200).json(analyzedData);
  } else {
    res.status(405).end();
  }
}

// pages/api/getDocumentData.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "documents.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      const documentData = JSON.parse(fileData);
      res.status(200).json(documentData);
    } else {
      res.status(200).json([]); // Return empty array if file doesn't exist
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

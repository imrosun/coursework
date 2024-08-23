// pages/api/saveDocumentData.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type DocumentData = {
  title: string;
  summary: string;
  totalWords: number;
  readingTime: number;
  language: string;
  subject: string;
  courseworkType: string;
  score: string;
};

const dataFilePath = path.join(process.cwd(), "data", "documents.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const documentData: DocumentData = req.body;

    // Read existing data from JSON file
    let existingData: DocumentData[] = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      existingData = JSON.parse(fileData);
    }

    // Append new data
    existingData.push(documentData);

    // Write updated data back to JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), "utf8");

    res.status(200).json({ message: "Document data saved successfully!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// pages/api/analyzeDocument.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

// Define the path to the data file
const dataFilePath = path.join(process.cwd(), "data", "documents.json");

// Helper function to read JSON data from file
const readDataFromFile = (): any[] => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileData);
    }
    return [];
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
};

// Helper function to write JSON data to file
const writeDataToFile = (data: any[]) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to data file:", error);
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { coursework_id, document, coursework_type, subject, title, sub_title, time, words_count, score, language } = req.body;

    // Validate the received data
    if (!coursework_id || !document || !coursework_type || !subject || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Read existing data
    const existingData = readDataFromFile();

    // Add new document analysis to data
    const newDocument = {
      coursework_id,
      document,
      coursework_type,
      subject,
      title,
      sub_title,
      time,
      words_count,
      score,
      language,
    };
    existingData.push(newDocument);

    // Write updated data back to file
    writeDataToFile(existingData);

    res.status(200).json({ message: "Document analyzed and saved successfully", data: newDocument });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

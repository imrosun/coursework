
// // pages/api/summarize.ts

// import formidable, { File } from "formidable";
// import fs from "fs";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// // Initialize OpenAI API
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key in .env file
// });
// const openai = new OpenAIApi(configuration);

// // Disable body parsing, formidable will handle it
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// type FormidablePromise = {
//   fields: formidable.Fields;
//   files: formidable.Files;
// };

// const parseForm = (req: NextApiRequest): Promise<FormidablePromise> => {
//   const form = new formidable.IncomingForm();
//   form.uploadDir = "./uploads"; // Set your upload directory
//   form.keepExtensions = true; // Keep file extensions

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       // Parse the incoming form
//       const { files } = await parseForm(req);
//       const file = files.file as File;
//       const filePath = file.filepath;

//       // Read the file content
//       const fileContent = fs.readFileSync(filePath, "utf8");

//       // Call OpenAI API to summarize the document
//       const response = await openai.createChatCompletion({
//         model: "gpt-4", // or "gpt-3.5-turbo"
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant that summarizes documents.",
//           },
//           {
//             role: "user",
//             content: `Summarize the following document:\n\n${fileContent}`,
//           },
//         ],
//       });

//       const summary = response.data.choices[0].message?.content ?? "No summary available.";
//       fs.unlinkSync(filePath); // Delete the uploaded file after processing

//       res.status(200).json({ summary });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to process the document." });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

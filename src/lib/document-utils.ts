import { franc } from 'franc-min'; 

export const extractTextFromPDF = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/parse-pdf', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to extract text from PDF');
    }
  
    const result = await response.json();
    return result.text;
  };
  
 
  export const extractTextFromDOCX = async (file: File): Promise<string> => {
    // Convert file to base64
    const reader = new FileReader();
    const filePromise = new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file); // Use readAsDataURL to get base64 data
    });
  
    const base64File = await filePromise;
    const base64Data = base64File.split(',')[1]; // Remove data URL prefix
  
    const response = await fetch('/api/parse-docx', {
      method: 'POST',
      body: JSON.stringify({ file: base64Data }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Failed to extract text from DOCX: ${errorText}`);
    }
  
    const result = await response.json();
    return result.text;
  };
  
  // Function to count words in a given text
  export const countWords = (text: string): number => {
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };
  
  // Function to calculate reading time based on word count
  export const calculateReadingTime = (wordCount: number): number => {
    const wordsPerMinute = 200; // Average reading speed
    return Math.ceil(wordCount / wordsPerMinute);
  };
  
  // Function to detect language from text
  export const detectLanguage = (text: string): string => {
    const langCode = franc(text);
    return langCode;
  };
  
  // Function to get the first line from the text
  export const getFirstLine = (text: string): string => {
    return text.split('\n').find((line) => line.trim().length > 0) || '';
  };
  
  // Function to generate a random score out of 7
  export const generateRandomScore = (): string => {
    const score = Math.floor(Math.random() * 7) + 1;
    return `${score}/7`;
  };
  
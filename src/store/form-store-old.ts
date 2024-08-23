import create from 'zustand';
import { extractTextFromPDF, extractTextFromDOCX, countWords, calculateReadingTime, detectLanguage, getFirstLine, generateRandomScore } from '@/lib/document-utils';

// Define the shape of the analyzed data
interface AnalyzedData {
  coursework_id: number;
  document: string;
  coursework_type: string;
  subject: string;
  title: string;
  sub_title: string;
  time: number;
  words_count: number;
  score: string;
  language: string;
}

// Define the shape of the form data
interface FormData {
  file: File | null;
  course: string;
  subject: string;
  essayTitle: string;
  error: string;
  analyzedData: AnalyzedData[];
  setFile: (file: File | null) => void;
  setCourse: (course: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (title: string) => void;
  setError: (error: string) => void;
  analyzeDocument: (file: File) => Promise<void>;
  saveData: (data: AnalyzedData) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

// Create the Zustand store
export const useFormStore = create<FormData>((set, get) => ({
  file: null,
  course: "",
  subject: "",
  essayTitle: "",
  error: "",
  analyzedData: [],

  setFile: (file: File | null) => set({ file }),
  setCourse: (course: string) => set({ course }),
  setSubject: (subject: string) => set({ subject }),
  setEssayTitle: (title: string) => set({ essayTitle: title }),
  setError: (error: string) => set({ error }),

  analyzeDocument: async (file: File) => {
    let text = '';

    if (file.name.endsWith('.pdf')) {
      text = await extractTextFromPDF(file);
    } else if (file.name.endsWith('.docx')) {
      text = await extractTextFromDOCX(file);
    }

    const wordsCount = countWords(text);
    const timeToRead = calculateReadingTime(wordsCount);
    const language = detectLanguage(text);
    const subTitle = getFirstLine(text);
    const score = generateRandomScore();

    const { course, subject, essayTitle } = get(); // Get the current state values

    const analyzedData: AnalyzedData = {
      coursework_id: Date.now(),
      document: file.name.split('.').pop() || '',
      coursework_type: course,
      subject: subject,
      title: essayTitle,
      sub_title: subTitle,
      time: timeToRead,
      words_count: wordsCount,
      score: score,
      language: language,
    };

    set((state) => ({
      analyzedData: [...state.analyzedData, analyzedData],
    }));
  },

  saveData: (data: AnalyzedData) => {
    set((state) => {
      const updatedAnalyzedData = [...state.analyzedData, data];
      localStorage.setItem("formData", JSON.stringify({
        analyzedData: updatedAnalyzedData
      }));
      return { analyzedData: updatedAnalyzedData };
    });
  },

  saveToLocalStorage: () => {
    set((state) => {
      const { file, course, subject, essayTitle, analyzedData } = state;
      localStorage.setItem("formData", JSON.stringify({
        file: file ? { name: file.name } : null,
        course,
        subject,
        essayTitle,
        analyzedData,
      }));
      return state;
    });
  },

  loadFromLocalStorage: () => {
    const data = localStorage.getItem("formData");
    if (data) {
      const parsedData = JSON.parse(data);
      set({
        file: parsedData.file ? new File([], parsedData.file.name) : null,
        course: parsedData.course,
        subject: parsedData.subject,
        essayTitle: parsedData.essayTitle,
        analyzedData: parsedData.analyzedData || [],
      });
    }
  },
}));

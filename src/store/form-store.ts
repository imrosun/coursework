import { create } from "zustand";

type DocumentData = {
  title: string;
  summary: string;
  totalWords: number;
  readingTime: number;
  language: string;
  subject: string;
  courseworkType: string;
  score: string;
  timestamp: number;
};

type FormStore = {
  file: File | null;
  course: string;
  subject: string;
  essayTitle: string;
  error: string;
  documents: DocumentData[];
  setFile: (file: File | null) => void;
  setCourse: (course: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (essayTitle: string) => void;
  setError: (error: string) => void;
  analyzeDocument: (file: File) => Promise<void>;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  saveData: (data: DocumentData) => Promise<void>;
};

export const useFormStore = create<FormStore>((set, get) => ({
  file: null,
  course: "",
  subject: "",
  essayTitle: "",
  error: "",
  documents: [],
  setFile: (file) => set({ file }),
  setCourse: (course) => set({ course }),
  setSubject: (subject) => set({ subject }),
  setEssayTitle: (essayTitle) => set({ essayTitle }),
  setError: (error) => set({ error }),

  analyzeDocument: async (file: File) => {
    try {
      // Simulate a delay for evaluation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const { course, subject, essayTitle, setFile, setCourse, setSubject, setEssayTitle } = get();
      const documentData: DocumentData = {
        title: essayTitle,
        summary: "This is a mock summary of the document.",
        totalWords: 1500,
        readingTime: 10,
        language: "English",
        subject: subject,
        courseworkType: course,
        score: "7/7",
        timestamp: Date.now(),
      };

      // Save the mock data to the backend
      await fetch("/api/save-document-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentData),
      });

      // Save data to local storage, avoiding duplicates
      const existingData = JSON.parse(localStorage.getItem("documents") || "[]") as DocumentData[];
      const isDuplicate = existingData.some(doc => doc.title === documentData.title && doc.timestamp === documentData.timestamp);

      if (!isDuplicate) {
        existingData.push(documentData);
        localStorage.setItem("documents", JSON.stringify(existingData));
        set({ documents: existingData });
      }

      // Reset form fields after successful save
      setFile(null);
      setCourse("");
      setSubject("");
      setEssayTitle("");

    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  saveToLocalStorage: () => {
    const { file, course, subject, essayTitle } = get();
    const documentData: DocumentData = {
      title: essayTitle || "How does the temperature of a Copper...",
      summary: "How does the temperature of a Copper pipe affect the time it takes a magnet to fall thought",
      totalWords: 2388,
      readingTime: 18,
      language: "English",
      subject: subject,
      courseworkType: course || "Physics HL",
      score: "7/7",
      timestamp: Date.now(),
    };

    // Only add sample data if it doesn't already exist
    const existingData = JSON.parse(localStorage.getItem("documents") || "[]") as DocumentData[];
    const isDuplicate = existingData.some(doc => doc.title === documentData.title && doc.timestamp === documentData.timestamp);

    if (!isDuplicate) {
      existingData.push(documentData);
      localStorage.setItem("documents", JSON.stringify(existingData));
    }
  },

  loadFromLocalStorage: () => {
    // Load documents from local storage and sort them by timestamp descending
    const data = JSON.parse(localStorage.getItem("documents") || "[]") as DocumentData[];
    set({ documents: data.sort((a, b) => b.timestamp - a.timestamp) });
  },

  saveData: async (data) => {
    const existingData = JSON.parse(localStorage.getItem("documents") || "[]") as DocumentData[];
    const isDuplicate = existingData.some(doc => doc.title === data.title && doc.timestamp === data.timestamp);

    if (!isDuplicate) {
      existingData.push(data);
      localStorage.setItem("documents", JSON.stringify(existingData));
      set({ documents: existingData });
    }
  },
}));

"use client"
import Image from "next/image";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import multiple_star from "@/assets/multiple_star.svg";
import upload_file from "@/assets/upload_file.svg";
import poster from "@/assets/Image.svg";
import coursework from "@/assets/coursework.svg";
import clock from "@/assets/clock.svg";
import words from "@/assets/words.svg";
import score from "@/assets/marks.svg";
import language from "@/assets/language.svg";
import create from 'zustand';

// Define the shape of the form data
interface FormData {
  file: File | null;
  course: string;
  subject: string;
  essayTitle: string;
  error: string;
}

// Zustand store for managing form state
const useFormStore = create<{
  file: File | null;
  course: string;
  subject: string;
  essayTitle: string;
  error: string;
  setFile: (file: File | null) => void;
  setCourse: (course: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (title: string) => void;
  setError: (error: string) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}>((set) => ({
  file: null,
  course: "",
  subject: "",
  essayTitle: "",
  error: "",
  setFile: (file: File | null) => set({ file }),
  setCourse: (course: string) => set({ course }),
  setSubject: (subject: string) => set({ subject }),
  setEssayTitle: (title: string) => set({ essayTitle: title }),
  setError: (error: string) => set({ error }),
  saveToLocalStorage: () => {
    set((state) => {
      const { file, course, subject, essayTitle } = state;
      localStorage.setItem("formData", JSON.stringify({
        file: file ? { name: file.name } : null, // Store only the file name
        course,
        subject,
        essayTitle
      }));
      return state; // Ensure we return the correct state type here
    });
  },
  loadFromLocalStorage: () => {
    const data = localStorage.getItem("formData");
    if (data) {
      const parsedData = JSON.parse(data);
      set({
        file: parsedData.file ? new File([], parsedData.file.name) : null, // Re-create the file with just the name
        course: parsedData.course,
        subject: parsedData.subject,
        essayTitle: parsedData.essayTitle,
      });
    }
  },
}));

export default function Home() {
  const {
    file, course, subject, essayTitle, error,
    setFile, setCourse, setSubject, setEssayTitle, setError,
    saveToLocalStorage, loadFromLocalStorage
  } = useFormStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [file, course, subject, essayTitle]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const validateAndSetFile = (file: File | null) => {
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setError("File is too large, must be under 25 MB.");
        setFile(null);
      } else if (!file.name.match(/\.(pdf|docx)$/)) {
        setError("Invalid file type. Only PDF and DOCX are allowed.");
        setFile(null);
      } else {
        setError("");
        setFile(file);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const isFormComplete = file && course && subject && essayTitle;

  return (
    <div className="bg-[#e5ecf3]">
      {/* Save */}
      <div className="sm:mx-40 p-10 flex justify-between gap-10">
        <div>
          <h1 className="text-3xl font-semibold">
            Hey IB Folks! Unsure about the quality of your answers? <br />
            <span className="text-[#6947BF] font-bold"> We get you.</span>
          </h1>
          <div className="bg-[#f5f7fa] rounded-2xl border-[1px] mt-4 p-4">
            <div className="">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="drag-drop border-[1px] rounded-2xl p-4 text-center cursor-pointer"
              >
                <Image src={upload_file} alt="upload file" />
                <h2>Drag and drop a PDF or DOCX</h2>
                <h4>Limit 25 MB per file</h4>
                <Button variant="outline_link" onClick={() => document.getElementById("fileInput")?.click()}>
                  Upload your file
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={(e) => validateAndSetFile(e.target.files ? e.target.files[0] : null)}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {file && <p className="text-green-500 mt-2">File: {file.name}</p>}
              <h3>Select your course & subjects*</h3>
              <div className="flex flex-row gap-5 ">
                <Select onValueChange={(value) => setCourse(value)} value={course}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Coursework Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physic HL">Physic HL</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => setSubject(value)} value={subject}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Maths">Maths</SelectItem>
                    <SelectItem value="Computer">Computer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <h3 className="mt-4">Enter your essay title*</h3>
              <div className="flex flex-row gap-5 ">
                <Input
                  placeholder="How nation works...."
                  className="w-[380px]"
                  value={essayTitle}
                  onChange={(e) => setEssayTitle(e.target.value)}
                />
              </div>

              <Button
                variant={isFormComplete ? "default" : "gray"}
                className="inline-flex mt-4 gap-2"
                disabled={!isFormComplete}
              >
                <Image className="-ml-2" src={multiple_star} width={18} height={18} alt="button" />
                Evaluate your Score
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden md:block content-end">
          <Image className="" src={poster} alt="Poster" />
        </div>
      </div>

      {/* Display */}
      <div className="sm:mx-40 px-10 mt-4">
        <h2>My coursework</h2>
        <div className="flex justify-between border-[1px] bg-white">
          {/* Display saved Pdf file */}
          <div>
            <h1>
              {/* Display Essay Title  */}
            </h1>
            <h3> {/* Write document first paragraph in 2 lines */} </h3>
            <div className="inline-flex">
              <Image src={coursework} alt="coursework"/>
              <h5> {/* Show coursework type ex: Physics HL */} </h5>
            </div>
            <div className="inline-flex">
              <Image src={clock} alt="clock"/>
              <h5> {/* Show total time minute read time ex: 18 min read */} </h5>
            </div>
            <div className="inline-flex">
              <Image src={words} alt="words"/>
              <h5> {/* Show total count of words from document ex: 2388 words */} </h5>
            </div>
            <div className="inline-flex">
              <Image src={score} alt="score"/>
              <h5> {/* Show score out of 7 ex: 6/7 or ex: 7/7 */} </h5>
            </div>
            <div className="inline-flex">
              <Image src={language} alt="language"/>
              <h5> {/* Show language */} </h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

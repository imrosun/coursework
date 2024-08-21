"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useFormStore } from "@/store/form-store";
import { CourseworkDisplay } from "@/components/coursework-display";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import multiple_star from "@/assets/multiple_star.svg";
import upload_file from "@/assets/upload_file.svg";
import poster from "@/assets/Image.svg";

export default function Home() {
  const {
    file, course, subject, essayTitle, error,
    setFile, setCourse, setSubject, setEssayTitle, setError,
    saveToLocalStorage, loadFromLocalStorage, analyzeDocument, saveData
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

  const { toast } = useToast()

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // const handleEvaluate = async () => {
  //   if (file) {
  //     try {
  //       await analyzeDocument(file);
  //       toast({
  //         title: "Success!",
  //         description: "Document analyzed successfully.",
  //       });
  //     } catch (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: `There was a problem with your request: ${(error as Error).message}`,
  //         action: <ToastAction altText="Try again">Try again</ToastAction>,
  //       });
  //     }
  //   }
  // };

  const handleEvaluate = () => {
    if (file) {
      analyzeDocument(file);
      const analyzedData = {
        coursework_id: Date.now(),
        document: file.name.split('.').pop() || '',
        coursework_type: course,
        subject: subject,
        title: essayTitle,
        sub_title: 'First paragraph summary...',
        time: 18,
        words_count: 2388,
        score: '7/7',
        language: 'English'
        
      };
      saveData(analyzedData);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const isFormComplete = file && course && subject && essayTitle;

  return (
    <div className="bg-[#e5ecf3]">
      <div className="sm:mx-40 p-10 flex justify-between gap-10">
        <div>
          <h1 className="text-3xl font-semibold">
            Hey IB Folks! Unsure about the quality of your answers? <br />
            <span className="text-[#6947BF] font-bold"> We get you.</span>
          </h1>
          <div className="bg-[#f5f7fa] rounded-2xl border-[1px] mt-4 p-4">
            <div onDrop={handleDrop} onDragOver={handleDragOver} className="drag-drop border-[1px] rounded-2xl p-4 text-center cursor-pointer">
              <Image src={upload_file} alt="upload file" />
              <h2>Drag and drop a PDF or DOCX</h2>
              <h4>Limit 25 MB per file</h4>
              <Button variant="outline_link" onClick={() => document.getElementById("fileInput")?.click()}>
                Upload your file
              </Button>
              <input id="fileInput" type="file" accept=".pdf,.docx" className="hidden" onChange={(e) => validateAndSetFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {file && <p className="text-green-500 mt-2">File: {file.name}</p>}
            <h3>Select your course & subjects*</h3>
            <div className="flex flex-row gap-5">
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
            <div className="flex flex-row gap-5">
              <Input placeholder="How nation works...." className="w-[380px]" value={essayTitle} onChange={(e) => setEssayTitle(e.target.value)} />
            </div>

            <Button variant={isFormComplete ? "default" : "gray"} className="inline-flex mt-4 gap-2" disabled={!isFormComplete} onClick={handleEvaluate}>
              <Image className="-ml-2" src={multiple_star} width={18} height={18} alt="button" />
              Evaluate your Score
            </Button>
          </div>
        </div>
        <div className="hidden md:block content-end">
          <Image className="" src={poster} alt="Poster" />
        </div>
      </div>
      <CourseworkDisplay />
    </div>
  );
}

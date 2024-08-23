"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import courseworkIcon from "@/assets/coursework.svg";
import clockIcon from "@/assets/clock.svg";
import wordsIcon from "@/assets/words.svg";
import scoreIcon from "@/assets/marks.svg";
import languageIcon from "@/assets/language.svg";
import paragraph from "@/assets/paragraph.svg";

type DocumentData = {
  title: string;
  summary: string;
  totalWords: number;
  readingTime: number;
  language: string;
  subject: string;
  courseworkType: string;
  score: string;
  timestamp: number; // Add timestamp field
};

const CourseworkDisplay: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const savedData = JSON.parse(localStorage.getItem("documents") || "[]");
      // Sort documents by timestamp in descending order
      const sortedData = savedData.sort((a: DocumentData, b: DocumentData) => b.timestamp - a.timestamp);
      setDocuments(sortedData);
    };

    fetchData();
  }, []);

  return (
    <div className="sm:mx-40 px-10">
      <h2 className="mb-4 mt-4 text-[#5B6170]">My Coursework</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
      {documents.length > 0 ? (
          documents.map((doc, index) => (
          <div key={doc.title} className="flex justify-between border-[1px] rounded-2xl p-4 gap-5 bg-gradient-to-r"  
            style={{
              backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, #e7e5e1 90%)'
            }}>
            <Image className="border-[1px] rounded-2xl bg-white p-2" src={paragraph} alt='paragraph'/>
            <div>
              <h1 className="text-[#3D404B] font-bold text-xl">{doc.title}</h1>
              <h3 className="text-[#7A8196]">{doc.summary}</h3>
              <div className="flex-wrap-reverse">
                <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                  <Image src={courseworkIcon} alt="coursework" />
                  <h5>{doc.courseworkType}</h5>
                </div>
                <div className="inline-flex mr-2 bg-white gap-1 p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                  <Image src={clockIcon} alt="clock" />
                  <h5>{doc.readingTime} min read</h5>
                </div>
                <div className="inline-flex mr-2 bg-white gap-1 p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                  <Image src={wordsIcon} alt="words" />
                  <h5>{doc.totalWords} words</h5>
                </div>
                <div className="inline-flex mr-2 bg-white gap-1 p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                  <Image src={scoreIcon} alt="score" />
                  <h5>{doc.score}</h5>
                </div>
                <div className="inline-flex mr-2 gap-1 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                  <Image src={languageIcon} alt="language" />
                  <h5>{doc.language}</h5>
                </div>
              </div>
            </div>
          </div>
         ))
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseworkDisplay;

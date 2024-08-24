import Image from "next/image";
import { useState } from "react";
import { useFormStore } from "@/store/form-store";
import courseworkIcon from "@/assets/coursework.svg";
import clockIcon from "@/assets/clock.svg";
import wordsIcon from "@/assets/words.svg";
import scoreIcon from "@/assets/marks.svg";
import languageIcon from "@/assets/language.svg";
import paragraph from "@/assets/paragraph.svg";

export const ExploreCoursework = () => {
  const { analyzedData } = useFormStore();
  const [selectedType, setSelectedType] = useState<string>("All");

  // Function to filter analyzed data based on selected type
  const filteredData = selectedType === "All"
    ? analyzedData
    : analyzedData.filter((data) => data.coursework_type === selectedType);

  return (
    <div className="sm:mx-40 px-10">
      <h2 className="mb-4 mt-4 font-bold text-[#5B6170]">Explore coursework</h2>
      <nav className="mb-4 font-semibold">
        {["All", "IA Example", "EE Example", "IO Example", "Tok Example"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`inline-flex gap-1 mr-4 p-2 rounded-xl text-sm ${
              selectedType === type ? "bg-white text-[#6947BF] font-bold" : " text-[#98A1BB]"
            }`}
          >
            {type}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((data, index) => (
            <div key={data.coursework_id} className="flex justify-between border-[1px] rounded-2xl p-4 gap-5 bg-gradient-to-r"
              style={{
                backgroundImage: 'linear-gradient(to right, #FFFFFF 0%, #e7e5e1 90%)'
              }}>
              <Image className="border-[1px] rounded-2xl bg-white p-2" src={paragraph} alt='paragraph' />
              <div>
                <h1 className="text-[#3D404B] font-bold text-xl">{data.title}</h1>
                <h3 className="text-[#7A8196]">{data.sub_title}</h3>
                <div className="flex-wrap-reverse">
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={courseworkIcon} alt="coursework" />
                    <h5>{data.coursework_type}</h5>
                  </div>
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={clockIcon} alt="clock" />
                    <h5>{data.time} min read</h5>
                  </div>
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={wordsIcon} alt="words" />
                    <h5>{data.words_count} words</h5>
                  </div>
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={scoreIcon} alt="score" />
                    <h5>{data.score}</h5>
                  </div>
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={languageIcon} alt="language" />
                    <h5>{data.language}</h5>
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

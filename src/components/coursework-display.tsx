import Image from "next/image";
import { useState } from "react"; // Import useState hook
import { useFormStore } from "@/store/form-store";
import courseworkIcon from "@/assets/coursework.svg";
import clockIcon from "@/assets/clock.svg";
import wordsIcon from "@/assets/words.svg";
import scoreIcon from "@/assets/marks.svg";
import languageIcon from "@/assets/language.svg";
import paragraph from "@/assets/paragraph.svg";

export const CourseworkDisplay = () => {
  const { analyzedData } = useFormStore();
  const [showAll, setShowAll] = useState(false); // State to control the view

  const handleToggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const sortedData = [...analyzedData].sort((a, b) => b.timestamp - a.timestamp);

  const itemsToDisplay = showAll ? sortedData : sortedData.slice(0, 2); // Show all items or only the first 2

  return (
    <div className="sm:mx-40 px-10">
      <h2 className="mb-4 mt-4 font-bold text-[#5B6170]">My Coursework</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
      {sortedData.length > 0 ? (
          itemsToDisplay.map((data, index) => (
            <div
              key={data.coursework_id}
              className="flex justify-between border-[1px] rounded-2xl p-4 gap-5 bg-gradient-to-r"
              style={{
                backgroundImage: "linear-gradient(to right, #FFFFFF 0%, #e7e5e1 90%)",
              }}
            >
              <Image className="border-[1px] rounded-2xl bg-white p-2" src={paragraph} alt="paragraph" />
              <div>
                <h1 className="text-[#3D404B] font-bold text-xl">{data.title}</h1>
                <h3 className="text-[#7A8196]">{data.sub_title}</h3>
                <div className="flex-wrap-reverse">
                  <div className="inline-flex gap-1 mr-2 bg-white p-1 rounded-xl text-[#5B6170] text-sm font-bold">
                    <Image src={courseworkIcon} alt="coursework" />
                    <h5>{data.subject}</h5>
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

      {/* View More button */}
      {analyzedData.length > 2 && (
        <div className="flex justify-center">
          <button onClick={handleToggleShowAll} className="mt-4 p-2 text-sm font-bold text-[#5B6170] rounded-lg">
            {showAll ? "Show Less" : "View all"}
          </button>
        </div>
      )}
    </div>
  );
};

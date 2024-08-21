import Image from "next/image";
import { useFormStore } from "@/store/form-store";
import courseworkIcon from "@/assets/coursework.svg";
import clockIcon from "@/assets/clock.svg";
import wordsIcon from "@/assets/words.svg";
import scoreIcon from "@/assets/marks.svg";
import languageIcon from "@/assets/language.svg";

export const CourseworkDisplay = () => {
  const { analyzedData } = useFormStore();

  return (
    <div className="sm:mx-40 px-10">
      <h2>My Coursework</h2>
      <div className="grid grid-cols-2 gap-5">
      {analyzedData.map((data) => (
        <div key={data.coursework_id} className="flex justify-between border-[1px] rounded-2xl bg-white p-4 mt-4">
          <div>
            <h1>{data.title}</h1>
            <h3>{data.sub_title}</h3>
            <div className="inline-flex">
              <Image src={courseworkIcon} alt="coursework"/>
              <h5>{data.coursework_type}</h5>
            </div>
            <div className="inline-flex">
              <Image src={clockIcon} alt="clock"/>
              <h5>{data.time} min read</h5>
            </div>
            <div className="inline-flex">
              <Image src={wordsIcon} alt="words"/>
              <h5>{data.words_count} words</h5>
            </div>
            <div className="inline-flex">
              <Image src={scoreIcon} alt="score"/>
              <h5>{data.score}</h5>
            </div>
            <div className="inline-flex">
              <Image src={languageIcon} alt="language"/>
              <h5>{data.language}</h5>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

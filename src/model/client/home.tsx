// import Image from "next/image";
// import poster from "@/assets/Image.svg";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import multiple_star from "@/assets/multiple_star.svg";
// import upload_file from "@/assets/upload_file.svg";

// export default function Home() {
//   return (
//     <div className="bg-[#e5ecf3]">
//       <div className="sm:mx-40 p-10 flex justify-between gap-10">
//         <div className="">
//           <h1 className="text-3xl font-semibold">
//             Hey IB Folks ! Unsure about the quality of your answers? <br />
//             <span className="text-[#6947BF] font-bold"> We get you.</span>
//           </h1>
//           <div className="bg-[#f5f7fa] rounded-2xl border-[1px] mt-4 p-4">
//             <div className="">
//               <div className="drag-drop border-[1px] rounded-2xl p-4 text-center">
//                 <Image src={upload_file} alt="upload file" />
//                 <h2>Drag and drop a PDF</h2>
//                 <h4>Limit 25 MB per file</h4>
//                 <Button variant="outline_link">Upload your file</Button>
//               </div>
//               <h3>Select your course & subjects*</h3>
//               <div className="flex flex-row gap-5 ">
//                 <Select>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Coursework Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="light">Physic HL</SelectItem>
//                     <SelectItem value="dark">Chemistry</SelectItem>
//                     <SelectItem value="system">Biology</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Subject" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="light">Science</SelectItem>
//                     <SelectItem value="dark">Maths</SelectItem>
//                     <SelectItem value="system">Computer</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <h3 className="mt-4">Enter your essay title*</h3>
//               <div className="flex flex-row gap-5 ">
//                 <Input placeholder="how nation works...." className="w-[380px]" />
//               </div>

//               <Button variant="gray" className="inline-flex mt-4 gap-2">
//                 <Image className="-ml-2" src={multiple_star} width={18} height={18} alt="button" />
//                 Evaluate your Score
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="hidden md:block content-end">
//           <Image className="" src={poster} alt="Poster" />
//         </div>
//       </div>
      
//       <div className="sm:mx-40 px-10 mt-4">
//         <h2>My coursework</h2>
//         <div className="flex justify-between border-[1px] bg-white">
//           {/* Display saved Pdf file */}
//           <div>
//             <h1>
//               {/* Display Essay Title  */}
//             </h1>
//             <h3> {/* Write document first paragraph in 2 lines */} </h3>
//             <div className="inline-flex">
//               <Image src={coursework} alt="coursework"/>
//               <h5> {/* Show coursework type ex: Physics HL */} </h5>
//             </div>
//             <div className="inline-flex">
//               <Image src={clock} alt="clock"/>
//               <h5> {/* Show total time minute read time ex: 18 min read */} </h5>
//             </div>
//             <div className="inline-flex">
//               <Image src={words} alt="words"/>
//               <h5> {/* Show total count of words from document ex: 2388 words */} </h5>
//             </div>
//             <div className="inline-flex">
//               <Image src={score} alt="score"/>
//               <h5> {/* Show score out of 7 ex: 6/7 or ex: 7/7 */} </h5>
//             </div>
//             <div className="inline-flex">
//               <Image src={language} alt="language"/>
//               <h5> {/* Show language */} </h5>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }


// [
//     {
//         "coursework_id": 1,
//         "document": ".pdf",
//         "coursework_type": "Physics HL",
//         "subject": "Science",
//         "title": "Quantum",
//         "sub_title": "",
//         "time": 18,
//         "words_count": 2388,
//         "score": 7/7,
//         "language": "English"
//     },
//     {
//         "coursework_id": 2,
//         "document": ".docx",
//         "coursework_type": "Biology",
//         "subject": "Science",
//         "title": "Something",
//         "sub_title": "",
//         "time": 7,
//         "words_count": 198,
//         "score": 4/7,
//         "language": "English"
//     }
// ]

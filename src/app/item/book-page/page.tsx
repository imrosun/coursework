import { Sidebar } from '@/components/sidebar';

export default function BookPage() {
  return (
    <div className="bg-[#e5ecf3]">
      <div className="mx-40 p-10">
        <h1 className="text-3xl font-semibold ">
          Hey IB Folks ! Unsure about the quality of your answers? <br></br>
          <span className="text-[#6947BF] font-bold"> We get you.</span>
        </h1>
        Book Page
        <div className="bg-[#f5f7fa] rounded-2xl border-[1px] mt-4 p-4">
          <h3 className="">
            Select your course & subjects*
          </h3>

        </div>
      </div>
    </div>
  );
}

"use client";
import { FC, use } from "react";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";
import Image from "next/image";
import useApp from "../hook/useApp";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { toContactUs } = useApp();
  return (
    <div>
      <div className="bg-black">
        <div className="bg-[#272626] flex md:flex-row flex-col justify-between space-y-4 p-10 mt-20">
          <div className="md:w-1/2 flex items-center justify-center">
            <p className="text-white font-bold text-xl p-5">
              Modern technology is allowing us to understand our genetic makeup
              and this empowers us to prevent disease and stay healthy. Here are
              videos and links highlighting the latest scientific research in
              genetics and medicine. The evidence speaks for itself- genetic
              testing is the core of preventative and precision medicine.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <iframe
              className="w-full aspect-video rounded-xl shadow-2xl"
              src="https://www.youtube.com/embed/zrqI-gsKqEI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col space-x-5 p-10 mt-20text-white mx-auto">
          <div className="p-5 flex flex-col justify-between border-b border-gray-200">
            <Image src={"/10to20.png"} width={400} height={400} alt="10to20" />
            <p className="text-white text-sm text-center">
              Mayo Clinic- Universal Genetic Testing Uncovers More Inherited
              Mutations vs Guideline-Based Genetic Testing
            </p>
          </div>
          <div className="p-5 flex flex-col justify-between border-b border-gray-200">
            <Image src={"/50.png"} width={400} height={400} alt="10to20" />
            <p className="text-white text-sm text-center">
              Journal of The American Medical Association- Population-Based
              Screening for BRCA1 and BRCA2
            </p>
          </div>
          <div className="p-5 flex flex-col justify-between border-b border-gray-200">
            <Image src={"/momdad.png"} width={400} height={400} alt="10to20" />
            <p className="text-white text-sm text-center">
              American Society of Clinical Oncology- Prevention, Risk Reduction,
              and Hereditary Cancer
            </p>
          </div>
        </div>
        <div className="items-center mx-auto  flex justify-center                                                                  jjjjmmmmmmmmmuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu">
          <button
            className="p-4 bg-accent-gold text-xl text-white rounded-xl font-bold  px-6"
            onClick={toContactUs}
          >
            REQUEST A TEST
          </button>
        </div>
      </div>
      <PanacceaLogo isHR={false} />
      <Footer />
      <div className=" mx-auto justify-center">
        <hr className=" " />
      </div>
    </div>
  );
};

export default page;

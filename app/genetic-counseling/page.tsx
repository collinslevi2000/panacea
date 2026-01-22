"use client";
import { FC } from "react";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";
import useApp from "../hook/useApp";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { toContactUs } = useApp();
  return (
    <div className="bg-black ">
      <div className="flex md:flex-row flex-col md:space-x-10 space-y-10 p-10 mt-32">
        <div className="h-92 p-5 border flex flex-col justify-between items-center pt-5 border-gray-400 md:w-1/2 space-y-5">
          <div>
            <h1 className="text-accent-teal text-5xl font-bold text-center">
              PRE-TEST COUNSELING SESSION
            </h1>
          </div>
          <div className="text-white text-center text-2xl px-5">
            <p>
              Schedule a 1-hr visit with a genetic counselor before you purchase
              a test to ask any questions.
            </p>
          </div>
          <div className="text-white text-center text-2xl px-5">
            <p>This pre-test visit fee is $169.</p>
          </div>
          <div className="items-center mx-auto  flex justify-center                                                                  jjjjmmmmmmmmmuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu">
            <button
              onClick={toContactUs}
              className="p-4 bg-accent-teal text-xl text-white rounded-xl font-bold  px-6"
            >
              Contact Us to Schedule a session
            </button>
          </div>
        </div>
        <div className="h-92 px-5 border flex flex-col items-center justify-between  py-5  border-gray-400 md:w-1/2 space-y-5">
          <div>
            <h1 className="text-accent-gold text-5xl font-bold text-center">
              POST-TEST COUNSELING SESSION
            </h1>
          </div>
          <div>
            <p className="text-white text-xl text-center font-semibold">
              Purchase a test today and receive a complimentary 1-hr post-test
              visit with a genetic counselor. Schedule your session upon
              receiving your results.
            </p>
          </div>
          <div className="items-center mx-auto  flex justify-center                                                                  jjjjmmmmmmmmmuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu">
            <button
              className="p-4 bg-accent-teal text-xl text-white rounded-xl font-bold  px-6"
              onClick={toContactUs}
            >
              REQUEST A TEST
            </button>
          </div>
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

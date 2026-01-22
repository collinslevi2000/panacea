import { FC } from "react";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="bg-[#272626]">
      <div className="text-white text-center p-10 space-y-5">
        <h1 className="text-center font-bold text-4xl">CONTACT US</h1>
        <p>
          Please submit your information in the form below and someone will
          contact with you within 24 hours.
        </p>
        <p>
          DO NOT PUT ANY HEALTH INFORMATION BELOW AS THIS FORM IS NOT
          CONFIDENTIAL
        </p>
      </div>
      <div>
        <form className="mx-auto md:px-52 px-5 space-y-2">
          <div>
            <label htmlFor="" className="text-white">
              First name
            </label>
            <input type="text" className="bg-white w-full p-2 rounded-xl" />
          </div>
          <div>
            <label htmlFor="" className="text-white">
              Last name
            </label>
            <input type="text" className="bg-white w-full p-2 rounded-xl" />
          </div>
          <div>
            <label htmlFor="" className="text-white">
              Your email
            </label>
            <input type="text" className="bg-white w-full p-2 rounded-xl" />
          </div>
          <div>
            <label htmlFor="" className="text-white">
              Subject
            </label>
            <input type="text" className="bg-white w-full p-2 rounded-xl" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-white">
              Your message (optional)
            </label>
            <textarea name="" id="" className="w-full h-40"></textarea>
          </div>
          <button className="bg-accent-teal rounded-xl text-white font-bold text-xl w-full p-3">
            Submit
          </button>
        </form>
      </div>
      <PanacceaLogo isHR={false} />
      <Footer />
      <div className=" mx-auto justify-center">
        <hr className="bg-gray-300 " />
      </div>
    </div>
  );
};

export default page;

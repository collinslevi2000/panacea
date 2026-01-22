import { FC } from "react";
import SocialIcons from "./SocialIcons";

interface JoinUsProps {}

const JoinUs: FC<JoinUsProps> = ({}) => {
  return (
    <div className=" py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-lg text-[#272626] md:text-2xl font-bold mb-6">
            Join Us
          </h2>

          <div className="flex justify-center mb-8">
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;

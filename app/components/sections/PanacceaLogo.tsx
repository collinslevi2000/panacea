import { FC } from "react";
import Logo from "../ui/Logo";

interface PanacceaLogoProps {
  isHR: Boolean;
}

const PanacceaLogo: FC<PanacceaLogoProps> = ({ isHR }) => {
  return (
    <div className="bg-black py-10 ">
      <div className=" flex  justify-center py-10 ">
        <Logo size="sm" />
      </div>
      {isHR && (
        <div className="px-10 mx-auto justify-center">
          <hr className="bg-gray-300 " />
        </div>
      )}
    </div>
  );
};

export default PanacceaLogo;

import { FC } from "react";

interface CopyrightProps {}

const Copyright: FC<CopyrightProps> = ({}) => {
  return (
    <div className=" ">
      <div className="container mx-auto ">
        <div className="text-center">
          <p className="text-gray-200">
            Copyright © 2023 Panacea. All rights reserved.
          </p>
          <p className="text-gray-200 text-sm ">
            DISEASE PREVENTION STARTS WITH YOU
          </p>
        </div>
      </div>
    </div>
  );
};

export default Copyright;

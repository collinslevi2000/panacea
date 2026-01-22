import Image from "next/image";

interface ProcessStepProps {
  number: number;
  iconSrc: string;
  title: string;
  description: string;
  align?: "left" | "right";
}

export default function ProcessStep({
  number,
  iconSrc,
  title,
  description,
  align = "right",
}: ProcessStepProps) {
  return (
    <div className="flex justify-around p-10">
      <div className="hidden md:block flex-shrink-0">
        <Image
          src={iconSrc}
          alt={`Step ${number} icon`}
          width={100}
          height={100}
          className=""
        />
      </div>
      <div className="w-1/2 pl-5 border-b border-gray-400 pb-10">
        <div className="flex flex-row space-x-5">
          <div className="">
            <h1 className=" text-5xl font-bold text-accent-teal">{number}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-accent-teal text-3xl font-bold pb-4">
              {title}
            </h1>
            <p className="text-white">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

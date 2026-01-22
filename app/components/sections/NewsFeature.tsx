import Image from "next/image";
import Link from "next/link";

export default function NewsFeature() {
  return (
    <div className="flex flex-col space-y-10 bg-black">
      <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 justify-around mb-5 items-center ">
        <div className="p-5">
          <Image
            src={"/newsimage.jpg"}
            alt="Palm Beach Article"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col space-y-3 items-center justify-center md:w-1/2">
          <div className="text-accent-teal text-6xl text-wrap font-extrabold">
            <h1 className="text-center">PANACEA IN PALM BEACH ILLUSTRATED</h1>
          </div>
          <div>
            <p className="text-3xl text-accent-gold font-semibold">
              February 2024
            </p>
          </div>
          <div className="text-white text-4xl text-center font-extrabold">
            <h1>
              How Dahlia's own company, saved her and her sister's lives.{" "}
              <Link href={""} className="hover:text-accent-gold underline">
                Read More{" "}
              </Link>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 justify-between mb-5 items-center ">
        <div className="flex flex-col md:w-1/2 p-14 space-y-5">
          <h1 className="text-accent-teal text-5xl font-semibold">
            Prevent disease by getting ahead of your genes
          </h1>
          <p className="text-white text-xl">
            Panacea connects you to quality laboratories, expert genetic
            counselors and trained physicians so you can access more affordable
            Whole Exome Sequencing and get in control of your health.
          </p>
        </div>

        <div className="md:w-1/2 ">
          <Image
            src={"/woman-on-phone.PNG"}
            alt="Palm Beach Article"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col space-y-10 md:space-y-0 justify-between mt-5 items-center ">
        <div className="md:w-1/2 ">
          <Image
            src={"/manpower.PNG"}
            alt="Palm Beach Article"
            width={400}
            height={400}
            className="w-full h-auto rounded-2xl object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col md:w-1/2 p-14 space-y-5">
          <h1 className="text-accent-teal text-5xl font-semibold">
            WES reviews all your genes, revealing actionable hereditary risks
          </h1>
          <p className="text-white text-xl">
            Whole Exome Sequencing is a very powerful disease prevention tool
            because you can identify which diseases you might have an elevated
            risk for and take focused action to catch the problem early or
            prevent it from happening.
          </p>
        </div>
      </div>
    </div>
  );
}

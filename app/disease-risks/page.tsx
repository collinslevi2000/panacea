"use client";
import Image from "next/image";
import { FC } from "react";
import useApp from "../hook/useApp";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { toContactUs } = useApp();
  return (
    <div className="bg-[#272626]">
      <div className="bg-accent-teal text-white p-6 py-9 text-center font-bold text-5xl">
        <h1>WHAT DISEASE RISKS CAN BE IDENTIFIED?</h1>
      </div>
      <div className=" gap-5 md:p-20 p-5 md:flex justify-between">
        <div className="md:w-1/2">
          <Image
            width={600}
            height={600}
            alt="vuvvh"
            src={"/disease-table.png"}
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-accent-teal font-bold text-5xl mb-5">
            Panacea partners with world-class CLIA and CAP certified genetic
            laboratories
          </h1>
          <p className="text-white">
            that adhere strictly to evidence-based science. They follow the
            guidance and knowledge base of reputable and trusted sources of
            genomic science like the the American College of Medical Genetics
            and Genomics (ACMG), the American College of Obstetricians and
            Gynecologists (ACOG), ClinVar and many others. That means every
            report reveals only well understood and well studied genetic changes
            that are known to cause or increase the risk for disease.
          </p>
          <p className="mt-5 text-white">
            This may contain actionable information or gene risks that have
            medically available interventions so that you can take action and
            lower your risks. It may also include non-actionable gene risks that
            have few or no current medical interventions, although this is less
            common. Explore the chart for a few common and actionable risks
            identified with Whole Exome Sequencing.
          </p>
        </div>
      </div>
      <div className=" gap-5 md:p-20 p-5 md:flex justify-between">
        <div className="md:w-1/2">
          <h1 className="text-accent-teal font-bold text-5xl mb-5">
            Carrier Genes
          </h1>
          <p className="text-white font-medium text-xl">
            Your report will highlight any changes detected in the 15 most
            common carrier genes (see chart), as recommended by the American
            College of Obstetricians and Gynecologists.
          </p>
          <p className="mt-5 text-white font-medium text-xl">
            Carrier genes are genes that “carry” a risk for a specific genetic
            condition, and that condition doesn’t affect you, but could affect
            your child if your partner has the same carrier gene.
          </p>
          <p className="mt-5 text-white font-medium text-xl">
            If you are family planning and are interested in more thorough
            carrier status analysis, you can request your raw data from us for
            free. Your raw data contains your full carrier status, but you will
            need to use third-party software to further analyze it. Promethease*
            is a reputable software that can analyze raw Exome data for a very
            low fee.
          </p>
          <p className="mt-5 text-white font-medium text-xl">
            *Panacea is not affiliated with Promethease in any way.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            width={600}
            height={600}
            alt="vuvsvh"
            src={"/disease-table-2.avif"}
          />
        </div>
      </div>
      <div className=" gap-5 md:p-20 p-5 md:flex justify-between">
        <div className="md:w-1/2">
          <h1 className="text-accent-teal font-bold text-5xl mb-5">
            Report Type: No Variants Detected
          </h1>
          <p className="text-white  text-xl">
            The majority of people will have a completely empty report.{" "}
            <span className="underline">
              This is actually the most desirable outcome because this means
              that no known hereditary disease causing changes have been
              identified in your exome.
            </span>{" "}
            This does not mean that you will never develop a problem like cancer
            or cardiovascular disease. It simply means that you are not at an
            elevated risk for these conditions compared to the average person.
            It is important to note that different labs may interpret genetic
            test results differently, especially for genes that are still not
            well understood by science.
          </p>
          <p className="mt-5 text-white font-medium text-xl">
            Our laboratory partners follow the guidance and knowledge base of
            reputable and trusted sources of genomic science like the American
            College of Medical Genetics and Genomics (ACMG), the American
            College of Obstetricians and Gynecologists (ACOG), ClinVar and many
            others. That means every report reveals only well understood and
            well studied genetic changes that are known to cause or increase the
            risk for disease. It is possible for other labs to include more
            information in their reports that is less validated or with unknown
            impact. You can always request your raw date for free, which
            contains all identified changes, including those not clearly
            understood by current science.
          </p>
        </div>
        <div className="md:w-1/2 justify-center flex items-center ">
          <Image
            width={600}
            height={600}
            alt="vuvsvh"
            src={"/negative-SS.png"}
          />
        </div>
      </div>
      <div className=" gap-5 md:p-20 p-5 md:flex justify-between">
        <div className="md:w-1/2">
          <h1 className="text-accent-teal font-bold text-5xl mb-5">
            Report Type: Variants Detected
          </h1>
          <p className="text-white  text-xl">
            Less than 10% of people will have a report containing one or more
            potentially disease causing genetic changes.{" "}
            <span className="underline">
              This is extremely valuable information as many genetic changes are
              actionable- this means that you can take action to prevent or
              catch some of these potential problems early.
            </span>
            This does not mean that you will develop a problem like cancer or
            cardiovascular disease. It simply means that you are at an elevated
            risk for these conditions compared to the average person.
          </p>
          <p className="mt-5 text-white font-medium text-xl">
            It is important to note that different labs may interpret genetic
            test results differently, especially for genes that are still not
            well understood by science. Our laboratory partners follow the
            guidance and knowledge base of reputable and trusted sources of
            genomic science like the American College of Medical Genetics and
            Genomics (ACMG), the American College of Obstetricians and
            Gynecologists (ACOG), ClinVar and many others.
          </p>
          <p className="text-white">
            That means every report reveals only well understood and well
            studied genetic changes that are known to cause or increase the risk
            for disease. It is possible for other labs to include more
            information in their reports that is less validated or with unknown
            impact. You can always request your raw date for free, which
            contains all identified changes, including those not clearly
            understood by current science.
          </p>
        </div>
        <div className="md:w-1/2 justify-between items-center flex flex-col space-y-5">
          <Image width={600} height={600} alt="vuvsvh" src={"/ss.png"} />
          <div className="items-center mx-auto  flex justify-center                                                                  jjjjmmmmmmmmmuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu">
            <button
              className="p-4 bg-accent-gold text-xl text-white rounded-xl font-bold  px-6"
              onClick={toContactUs}
            >
              REQUEST A TEST
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <PanacceaLogo isHR={false} />
        <Footer />
        <div className=" mx-auto justify-center">
          <hr className="bg-gray-300 " />
        </div>
      </div>
    </div>
  );
};

export default page;

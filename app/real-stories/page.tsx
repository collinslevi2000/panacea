import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="p-12">
      <h1 className="text-white text-4xl text-center font-semibold">
        REAL STORIES
      </h1>
      <div className="flex flex-row ">
        <div className="p-5 flex items-center justify-center">
          <Image
            src={"/two-girls.png"}
            width={300}
            height={300}
            alt={"two-girls"}
          />
        </div>
        <div className="w-3/4 p-10">
          <h3 className="text-accent-gold text-3xl my-5 font-semibold">
            Emily Epstein: How Genetic Testing Saved My Life
          </h3>
          <p className="text-white text-lg">
            Genetic testing saved Emily’s life. Emily was fortunate that she has
            one of the three BRCA mutations that 23andMe tests for, but she now
            knows there are thousands of BRCA mutations that exist and are
            missed by most direct-to-consumer genetic tests like 23andMe. She
            guides people to consider clinical genetic testing so that they can
            receive a truly useful and comprehensive test. Emily feels that
            Panacea’s greatest value is that it enables people to view their
            body’s “roadmap” and empowers people to make life-saving decisions
            for themselves in a way that few other companies do.
          </p>
          <Link href={"https://youtu.be/i3z_m0-jBqs"}>
            Watch interview here
          </Link>
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="w-3/4 p-10">
          <h3 className="text-accent-gold text-3xl my-5 font-semibold text-right">
            Dr. Nia Bailey: Radiation, Cancer and Genetics
          </h3>
          <p className="text-white text-lg text-right">
            Dr. Nia Bailey, a radiation therapist, observed a disturbing new
            trend in her patients: many of them were women in their 20s and 30s
            with breast cancer. Cancer occurrence before 50 is a sign that there
            might be some genetic factors playing a role. While some of them
            received genetic testing, their tests were not comprehensive and may
            have just covered BRCA 1/2. Most people are unaware that MANY genes
            beyond BRCA 1/2 are known to be involved in breast and other
            cancers. Testing negative for BRCA 1/2 does not mean your cancer is
            not genetic; it simply means there may be another gene involved in
            your cancer. Today, there are thousands of genes that science has
            understood to cause disease. Screening all of your genes with Whole
            Exome Sequencing leaves no stone unturned when it comes to your
            genetic risks.
          </p>
          <Link href={"https://youtu.be/puvK8wmNZGo"}>
            Watch interview here
          </Link>
        </div>
        <div className="p-5 flex items-center justify-center">
          <Image
            src={"/two-girls-1.png"}
            width={300}
            height={300}
            alt={"two-girlsa"}
          />
        </div>
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

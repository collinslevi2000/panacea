import Image from "next/image";
import { FC } from "react";
import Logo from "../components/ui/Logo";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col  space-y-10 bg-[#272626] p-20">
        <div className="flex md:flex-row flex-col ">
          <div className="md:w-1/2">
            <h1 className="text-accent-teal text-4xl font-bold ">
              WHAT IS WHOLE EXOME SEQUENCING (WES)?
            </h1>
          </div>
          <div className="md:w-1/2 hidden md:block"></div>
        </div>
        <div className="flex md:flex-row flex-col justify-between">
          <div className="md:w-1/2">
            <p className="text-white">
              Whole Exome Sequencing (WES) analyzes every known human gene,
              providing valuable information about individual disease risks such
              as cancer, neurological conditions, and some forms of
              cardiovascular disease. The report from Panacea focuses on
              scientifically validated and well understood genes—those with
              known risks and many with available medical interventions—enabling
              individuals to take proactive measures with physician oversight
              and expert genetic counseling all in one place.
            </p>
          </div>
          <div className="md:w-1/2 flex items-end justify-center ">
            <div className="flex flex-col text-center items-end justify-center">
              <div>
                <h1
                  className="flex text-accent-gold text-8xl 
               font-extrabold"
                >
                  10-25%
                </h1>
              </div>
              <div className="text-white  font-bold text-5xl">
                <p>of cancers are inherited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col bg-black">
        <div className="md:w-1/2 relative">
          <Image
            src={"/man-with-children.PNG"}
            fill
            className="object-cover"
            alt="Man with children"
          />
        </div>
        <div className="md:w-1/2">
          <div className="py-16 px-10">
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                HOW IS WES DIFFERENT FROM 23ANDME'S GENETIC TESTING?
              </h1>
              <p className="text-white text-xl">
                Popular direct-to-consumer companies like 23andMe* provide no
                medical expert guidance. In addition, they don’t offer CLINICAL
                testing. They don’t sequence your genes. They only search for a
                limited number of gene mutations, missing medically relevant
                changes they’re not specifically searching for. This incomplete
                picture can be likened to finishing only 20 pieces of a
                1,000-piece puzzle, leaving out vital details. Whole Exome
                Sequencing, however, sequences all known genes to ensure
                everything is examined. Panacea connects you to a certified
                genetic counselor to review any known genetic risks, and you can
                obtain your raw data, at no cost, for further analysis in
                specialized software, like Promethease*.
              </p>
              <p className="text-white text-xl">
                *Panacea is not affiliated with 23andMe or Promethease{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col  p-20  bg-[#272626] ">
        <div className="md:w-1/2">
          <h1 className="text-accent-gold text-center md:text-9xl text-6xl font-bold">
            Almost 1 in 2
          </h1>
          <p className="hover:text-accent-gold text-white text-5xl text-center font-bold">
            Americans will get cancer in their lifetime
          </p>
        </div>
        <div className="flex flex-col space-y-5 md:w-1/2 items-start">
          <h1 className="text-accent-teal text-3xl font-bold">
            WHO SHOULD GET WES?
          </h1>
          <p className="text-white">
            Any adult who wants to prevent disease and learn their own personal
            risk of having and/or passing on certain genetic conditions to their
            children should consider having WES. The results of genetic testing
            are not only valuable for the person being tested, but it also
            provides valuable risk information for parents, siblings and
            offspring. In addition, some studies are showing that about half of
            the people with genetic mutations that impact their health have no
            family history of disease, underscoring the importance for more
            people to get tested whether the have a family history of disease or
            not.
          </p>
        </div>
      </div>
      <div className="flex bg-black">
        <div className="md:w-1/2 relative">
          <Image
            src={"/family.png"}
            fill
            className="object-cover"
            alt="Man with children"
          />
        </div>
        <div className="md:w-1/2">
          <div className="py-16 px-10">
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                WHAT CAN I DO WITH THE RESULTS OF MY TEST?
              </h1>
              <p className="text-white text-xl">
                Although our scientific understanding of genetics is still in
                its infancy, many genes are well understood by science and
                several are “actionable” or have available medical interventions
                to help reduce the risk brought on by changes in those genes.
                Reviewing these results with a genetic counselor and physician
                aids in identifying areas for personalized medical care.
                Different genetic changes carry varying risks for specific
                diseases, clarifying your susceptibility. Tailoring your medical
                management allows for proactive and preventative care, like
                additional imaging or adjusting medications. You can obtain your
                raw data, containing all of your exome data at no extra cost,
                for continual analysis as science advances.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col  bg-[#272626] p-20">
        <div className="md:w-1/2 flex flex-col space-y-5">
          <div className="flex flex-col space-y-3">
            <h1 className="text-accent-teal font-bold text-4xl">
              WHERE CAN I GET WES?
            </h1>
            <p className="text-white text-lg">
              WES is a clinical test and requires the prescription of a doctor.
              Today, WES is used as a diagnostic tool when someone has an active
              problem, but it is rarely used for prevention. In fact, genetic
              testing in general is not widely used by doctors for prevention,
              mostly because insurance coverage for testing is sparse. Panacea
              is bringing Whole Exome Sequencing directly to you. We are
              partnering with US CLIA and CAP certified genetic laboratories,
              genetic counselors, and physicians to make this life-changing
              genetic information accessible without you even leaving your home
              or needing health insurance. You can fill out forms, purchase a
              kit, and schedule your free 1-hr genetic counseling session all
              directly with us.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="text-accent-teal font-bold text-4xl">
              HOW MUCH DOES WES COST?
            </h1>
            <p className="text-white text-lg">
              Whole Exome Sequencing is significantly underutilized due to high
              costs and limited insurance coverage. The average WES test today
              is $9K, not including physician oversight or genetic counseling.
              Panacea aims to increase access to and usage of Whole Exome
              Sequencing by partnering with efficient labs, genetic counselors,
              and physicians to reduce costs.
            </p>
            <br />

            <p className="text-white text-lg">
              We offer Whole Exome Sequencing, a clinical report, raw data,
              expert guidance and more for just $1,000.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 font-bold flex flex-col justify-center text-center items-center">
          <h1 className=" text-accent-gold text-8xl f">80%</h1>
          <h1 className="text-white text-6xl hover:text-accent-gold">
            of people who could benefit from clinical genetic testing don't get
            tested
          </h1>
        </div>
      </div>
      <div className="flex bg-black">
        <div className="md:w-1/2 relative">
          <Image
            src={"/fam-2.jpg"}
            fill
            className="object-cover"
            alt="Man with children"
          />
        </div>
        <div className="md:w-1/2">
          <div className="py-16 space-y-5 px-10">
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                HOW ACCURATE IS WES?
              </h1>
              <p className="text-white text-xl">
                WES is currently utilized in diagnostics and medical research
                and Panacea is bringing it to you as a powerful preventative
                tool. Panacea only partners with clinical laboratories that have
                CAP and CLIA certifications. This ensures the highest quality
                laboratory testing. While industry standard for WES has 30x
                depth of coverage, our lab partners offer 80x, which means that
                each section of your genes is reviewed ~80 times on average. In
                addition, the sensitivity and specificity of WES through our lab
                partners is 99%.
              </p>
            </div>
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                WHAT DISEASE RISKS CAN BE IDENTIFIED?
              </h1>
              <p className="text-white text-xl">
                WES is only as advanced as our current understanding of
                genetics. Today, we can identify gene changes in a single gene,
                BRCA 1 for example, that are directly linked to an increased
                risk of disease. Many diseases are linked to changes in only one
                gene. However, there are several complex diseases that are
                caused by changes in multiple genes. Diseases like diabetes,
                autoimmune disorders and most cardiovascular disease cases are
                complex and not well understood. These are not the disease risks
                that are currently identifiable with genetic testing. In
                addition, it is important to note that some identifiable changes
                known to increase risk for disease have no available medical
                interventions (non-actionable), but may be helped with lifestyle
                changes.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col  bg-[#272626] p-20">
        <div className="md:w-1/2 flex flex-col space-y-5">
          <div className="flex flex-col space-y-3">
            <h1 className="text-accent-teal font-bold text-4xl">
              WHAT WILL MY REPORT SHOW?
            </h1>
            <p className="text-white text-lg">
              The best case scenario is that your report is completely empty-
              the less found, the better! However, if something is found, the
              goal of the report is to arm you with useful, reliable and
              accurate information so that you can lower your disease risk, when
              possible. This is why our lab partners adhere strictly to
              evidence-based science in the curation of all Whole Exome reports.
              They follow the guidance and knowledge base of reputable and
              trusted sources of genomic science like the the American College
              of Medical Genetics and Genomics (ACMG), the American College of
              Obstetricians and Gynecologists (ACOG), ClinVar and many others.
              That means every report reveals only well understood and well
              studied genetic changes that are known to cause or increase the
              risk for disease. This may contain actionable information or gene
              risks that have medically available interventions so that you can
              take action and lower your risks. It may also include
              non-actionable gene risks that have few or no current medical
              interventions, although this is less common. The report also
              reviews 15 of the most common carrier genes. If you want access to
              ALL of your exome data, please request your raw data and we will
              send it to you at no extra charge. You can then input your raw
              data in third-party software to produce a larger report- be
              mindful that this may show information that is still not well
              understood by science and has unknown significance or value.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="text-accent-teal font-bold text-4xl">
              WHAT IS PANACEA'S DATA PRIVACY POLICY?
            </h1>
            <p className="text-white text-lg">
              There are very few laws that enforce health data privacy beyond
              HIPAA and many genetics companies share, sell and monetize your
              de-identified data. Our philosophy at Panacea is that your genetic
              data is YOUR GENETIC DATA, not ours. This is why Panacea doesn’t
              utilize your data after your test is completed without your
              knowledge and approval. If you do not approve, we simply don’t
              touch it. For your further protection, GINA is a federal law that
              prohibits your employer and health insurer from discriminating
              against you for your genetic results. GINA does NOT apply to life
              insurance in every state, so make sure you know the law in your
              state.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 font-bold flex flex-col justify-center text-center items-center">
          <h1 className=" text-accent-gold text-8xl f">80%</h1>
          <h1 className="text-white text-6xl hover:text-accent-gold">
            of people are willing to share their de-identified data, especially
            if they have transparency and control
          </h1>
        </div>
      </div>
      <div className="flex bg-black">
        <div className="md:w-1/2 relative">
          <Image
            src={"/strong-man.jpg"}
            fill
            className="object-cover"
            alt="Man with children"
          />
        </div>
        <div className="md:w-1/2">
          <div className="py-16 space-y-5 px-10">
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                WHAT DOES WES NOT DETECT?
              </h1>
              <p className="text-white text-xl">
                WES is currently utilized as a tool to diagnose an existing
                inherited rare disease or to identify the risk of developing
                certain inherited diseases. Panacea promotes the use of WES as a
                preventative tool that identifies disease risk and
                susceptibility. It DOES NOT identify the existence of cancer in
                your body. It also does NOT guarantee that you will or will not
                develop a problem in the future because science has not yet
                identified the full function of all of our genes. It is simply
                an effective look at known hereditary disease risks that can
                help you prevent a problem from occurring if you carry those
                risks.{" "}
              </p>
            </div>
            <div className="space-y-5">
              <h1 className="text-accent-teal text-5xl font-bold">
                WHAT ARE THE RISKS OF WES?{" "}
              </h1>
              <p className="text-white text-xl">
                Physical Risk: because the sampling method is a non-invasive
                mouth swab, the risk of infection or any other physical harm is
                extremely low.
              </p>
              <p className="text-white text-xl">
                Technical Risk: as mentioned above, CAP and CLIA certified labs
                using modern NGS technology have accuracy rates over 99%. While
                errors can occur, they are very rare.{" "}
              </p>
              <p className="text-white text-xl">
                Emotional/Mental Risk: this may be the largest of the three
                risks with genetic testing. Some results might seem overwhelming
                or scary. This is why we provide expert guidance with our
                genetic counseling partners to guide you with an effective
                action plan.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col p-20  bg-[#272626] ">
        <div className="md:w-1/2 my-auto">
          <h1 className="text-accent-gold text-center text-9xl font-bold">
            100k
          </h1>
          <p className="hover:text-accent-gold text-white text-5xl text-center font-bold">
            cancer diagnoses could be prevented with genetic testing every year
          </p>
        </div>
        <div className="flex flex-col space-y-5 md:w-1/2 items-start">
          <h1 className="text-accent-teal text-3xl font-bold">
            WHAT IS PANACEA DOING DIFFERENTLY?
          </h1>
          <p className="text-white">
            Panacea is collaborating with labs, genetic counselors, and
            physicians to reduce cost and increase access to genetic testing and
            genomic healthcare by bringing clinical genetic testing directly to
            people. Despite the invaluable preventative measures that can be
            guided by clinical genetic testing, it is not commonly used as a
            preventative tool today – and Panacea is changing exactly that.
          </p>
          <br />

          <p className="text-white">
            Part of the problem is that insurers don’t always cover genetic
            testing, especially for prevention, and it can be hard for
            physicians to integrate into their patient care, ultimately
            preventing people from being tested. Gone are the days of health
            insurance interference and people not knowing their options. ANYONE
            and everyone should have access to clinical-grade genetic testing
            and Panacea is making that a feasible, easily accessible, and
            cost-effective reality.{" "}
          </p>

          <p className="text-white italic">
            Please review consent forms for all details and limitations of
            clinical genetic testing prior to purchase.
          </p>
          <div className="items-center mx-auto  flex justify-center                                                                  jjjjmmmmmmmmmuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu">
            <button className="p-4 bg-accent-teal text-xl text-white rounded-xl font-bold  px-6">
              REQUEST A TEST
            </button>
          </div>
        </div>
      </div>
      <PanacceaLogo isHR={false} />
      <Footer />
      <div className=" mx-auto justify-center">
        <hr className="bg-gray-300 " />
      </div>
    </>
  );
};

export default page;

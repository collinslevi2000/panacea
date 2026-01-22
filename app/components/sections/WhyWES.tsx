import Link from "next/link";

const wesBenefits = [
  {
    number: 1,
    title: "YOU CAN GET AHEAD OF YOUR GENES",
    description:
      'By knowing your hereditary risk for diseases like cancer and cardiovascular disease, you and your doctors can create a more targeted approach to help catch disease before it becomes a problem. Many genes that carry a known risk have available medical interventions. These are called "actionable" genes. These are genetic risks you can do something about!',
    cta: {
      text: "What diseases can be screened?",
      href: "https://seekpanacea.com/disease-risks/",
    },
  },
  {
    number: 2,
    title: "EVERY GENE IS SEQUENCED AND YOU CAN REQUEST THE RAW DATA",
    description:
      "Unlike many limited genetic tests common today (23andMe etc), WES is one of the most comprehensive genetic tests available because it is a thorough analysis of every currently known human gene- that's thousands of genes. While your report today will focus on highlighting the genetic changes that are currently well understood by science, you can request your raw data (for free) to continually analyze all of your genes further in special software, especially as science progresses.",
    cta: {
      text: "Learn more about WES",
      href: "https://seekpanacea.com/whole-exome-sequencing/",
    },
  },
  {
    number: 3,
    title: "WITH PANACEA, IT IS MORE AFFORDABLE, WITHOUT NEEDING INSURANCE",
    description:
      "WES is rarely covered by insurance for prevention, and for the first time ever, Panacea is bringing WES directly to YOU in collaboration with our world class labs, physicians and genetic counseling partners. WES alone is commonly several thousand dollars, but through Panacea, WES and so much more is available for $1K!",
    cta: {
      text: "Does Science and medicine support genetic testing?",
      href: "https://seekpanacea.com/fascinating-science/",
    },
  },
];

export default function WhyWES() {
  return (
    <section className="py-20 bg-black">
      {wesBenefits.map((b) => (
        <div className="flex flex-col mx-auto px-20 mb-5">
          <h1 className="text-accent-teal mb-5 font-semibold text-2xl tracking-wider">
            {b.number}. {b.title}
          </h1>
          <p className="text-white pl-5 text-lg">{b.description}</p>
          <div className="items-center text-center my-10">
            <Link
              className="bg-accent-teal text-white text-lg p-4 rounded-xl font-bold capitalize"
              href={b.cta.href}
            >
              {b.cta.text}
            </Link>
          </div>
          <hr className="text-gray-500" />
        </div>
      ))}
    </section>
  );
}

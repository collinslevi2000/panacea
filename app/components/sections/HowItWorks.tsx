import CTAButton from "../ui/CTAButton";
import ProcessStep from "../ui/ProcessStep";

const processSteps = [
  {
    number: 1,
    iconSrc:
      "https://seekpanacea.com/wp-content/uploads/2023/06/credit-card-white-100x100.png",
    title: "ORDER A TEST",
    description:
      "Purchase a test in just a few clicks. We also accept HSA and FSA.",
  },
  {
    number: 2,
    iconSrc:
      "https://seekpanacea.com/wp-content/uploads/2023/06/contact-form-white-100x100.png",
    title: "FILL OUT THE FORMS",
    description:
      "Fill out and e-sign the forms in just a few minutes, right after checkout.",
  },
  {
    number: 3,
    iconSrc:
      "https://seekpanacea.com/wp-content/uploads/2023/06/medical-laboratory-white-100x100.png",
    title: "GET YOUR SAMPLING KIT",
    description:
      "Swab your cheek in under a minute right at home. Return your sample in the pre-paid envelope.",
  },
  {
    number: 4,
    iconSrc:
      "	https://seekpanacea.com/wp-content/uploads/2023/06/calendar-1-white-150x150.png",
    title: "GET YOUR RESULTS",
    description:
      "You can schedule a genetic counseling session after you receive your results.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            HOW IT WORKS
          </h2>
          <div className="border-t-2 border-gray-500 mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          {processSteps.map((step, index) => (
            <div key={step.number}>
              <ProcessStep
                number={step.number}
                iconSrc={step.iconSrc}
                title={step.title}
                description={step.description}
              />
              {index < processSteps.length - 1 && (
                <div className="h-8 ml-8 md:ml-12"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-white/20 bg-accent-teal py-5">
          <h3 className="capitalize text-2xl md:text-5xl font-bold text-white mb-4">
            GET A TEST KIT SHIPPED TO YOUR DOOR
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            our partner genetic counselors will guide you through your results
          </p>
          <CTAButton href="/contact-us" variant="extra">
            REQUEST A TEST
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

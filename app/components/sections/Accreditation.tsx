import Image from "next/image";
import Logo from "../ui/Logo";

const accreditations = [
  {
    id: 1,
    src: "https://seekpanacea.com/wp-content/uploads/2024/02/cap-accreditation-logo-1024x591.jpg",
    alt: "CAP Accreditation",
    title: "CAP Accreditation",
    description: "College of American Pathologists",
  },
  {
    id: 2,
    src: "https://seekpanacea.com/wp-content/uploads/2024/02/CLIA.jpeg",
    alt: "CLIA Certification",
    title: "CLIA Certified",
    description: "Clinical Laboratory Improvement Amendments",
  },
  {
    id: 3,
    src: "https://seekpanacea.com/wp-content/uploads/2024/02/AABB-1024x612.jpeg",
    alt: "AABB Accreditation",
    title: "AABB Accredited",
    description: "American Association of Blood Banks",
  },
];

export default function Accreditation() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-accent-teal mb-6">
            Our laboratory partners are accredited by:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {accreditations.map((accreditation) => (
            <div
              key={accreditation.id}
              className="group relative  rounded-2xl  hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-8 flex   flex-col items-center text-center">
                <div className="mb-6">
                  <Image
                    src={accreditation.src}
                    alt={accreditation.alt}
                    width={200}
                    height={120}
                    className="object-contain h-24 w-auto filter group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {accreditation.title}
                </h3>

                <p className="text-gray-600">{accreditation.description}</p>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}

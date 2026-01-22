import Image from "next/image";

const partnerLogos = [
  {
    id: 1,
    src: "https://seekpanacea.com/wp-content/uploads/2023/09/brcastrong-150x150.jpeg",
    alt: "BRCA Strong",
    width: 150,
    height: 150,
  },
  {
    id: 2,
    src: "https://seekpanacea.com/wp-content/uploads/2023/09/Screen-Shot-2023-09-06-at-4.07.38-PM-e1694031070956-150x150.png",
    alt: "My Faulty Gene",
    width: 150,
    height: 150,
  },
  {
    id: 3,
    src: "https://seekpanacea.com/wp-content/uploads/2023/09/pancan-150x150.png",
    alt: "Pancreatic Cancer Action Network",
    width: 150,
    height: 150,
  },
];

export default function PartnerLogos() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="border-t border-gray-300 w-24 mx-auto mb-8"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-accent-teal mt-5">
            Partnering with patient advocacy organizations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-3xl mx-auto">
          {partnerLogos.map((logo) => (
            <div key={logo.id} className="flex justify-center items-center ">
              <div className=" p-6  shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="border-t border-gray-300 w-24 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}

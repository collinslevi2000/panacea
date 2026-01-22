import { FC } from "react";
import Image from "next/image";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";

interface MediaItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

const mediaItems: MediaItem[] = [
  {
    title:
      "Breaking Down Barriers: The Rise of Direct-to-Consumer Genetic Testing and Its Impact on Preventive Medicine Industry",
    description:
      "In recent years, a significant shift has occurred in the healthcare landscape, marked by the rise of direct-to-consumer genetic testing. This trend represents a departure from traditional healthcare models, empowering individuals to take proactive steps towards managing their health.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/Health-Care-Equipment-Markets-and-money-750x375-1.jpg",
    link: "https://beststocks.com/breaking-down-barriers-the-rise-of/",
  },
  {
    title:
      "Panacea: Interview With Founder Dahlia Attia-King About Offering DTC Clinical-Grade Genetic Sequencing",
    description:
      "Panacea is a company that provides clinic-grade whole exome sequencing directly to consumers to help with preventative healthcare planning. Pulse 2.0 interviewed Panacea founder Dahlia Attia-King to learn more about the company.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/Dahlia-Attia-King-486x600-1.jpg",
    link: "https://pulse2.com/panacea-profile-dahlia-attia-king-interview/",
  },
  {
    title: "Consumer Genomics: How to Engage Patients with DNA Testing",
    description:
      "Just as 23andMe, once direct-to-consumer (DTC) testing’s darling, faced a huge drop in share value and once hot startup LunaDNA was shuttering, Panacea was promoting its new DTC genetic testing service.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/Jun1_2024_GettyImages_970394890_FemaleDoctorDNA-1392x928-1-1024x683.jpg",
    link: "https://www.insideprecisionmedicine.com/topics/patient-care/consumer-genomics-how-to-engage-patients-with-dna-testing/",
  },
  {
    title: "Genetic Testing for a Longer Healthspan",
    description:
      "For this feature edition, we were joined by Dahlia Attia-King, the Founder of Panacea, a direct-to-consumer genetic company who is making testing more accessible to the public.",
    image: "https://seekpanacea.com/wp-content/uploads/2024/08/dahka.avif",
    link: "https://livelongmedia.com/p/get-genetic-test?utm_source=livelongmedia.com&utm_medium=newsletter&utm_campaign=should-you-get-a-genetic-test",
  },
  {
    title: "Transforming Medicine with Advanced Genetic Insights",
    description:
      "Join Anthony Amen on Health and Fitness Redefined as he sits down with Dahlia Attia-King, founder and CEO of Panacea. Dahlia's story is nothing short of inspiring—transitioning from a hopeful medical student to a leader in health tech, she has dedicated her career to making clinical genetic testing both accessible and affordable.",
    image: "https://seekpanacea.com/wp-content/uploads/2024/08/626x0w-2.webp",
    link: "https://podcasts.apple.com/us/podcast/transforming-medicine-with-advanced-genetic-insights/id1506247991?i=1000663657428",
  },
  {
    title:
      "Better Testing Leads to Better Health Outcomes, with Dahlia Attia-King of Panacea",
    description:
      "Join Erica Huss, longtime wellness industry expert and entrepreneur, as she shares what she’s learned from over the years from building brands and products, creating conversations and experiences, and on my own health journey.",
    image: "https://seekpanacea.com/wp-content/uploads/2024/08/626x0w-1.webp",
    link: "https://podcasts.apple.com/us/podcast/better-testing-leads-to-better-health-outcomes-with/id1705360946?i=1000664018070",
  },
  {
    title: "Transforming Healthcare with Genetic Testing",
    description:
      'Join us at "Business Owners Speak," featuring Dahlia Attia-King, Founder of Panacea. Panacea is transforming the landscape of preventative healthcare with its comprehensive genetic testing services.',
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/Captura-de-pantalla-2024-08-14-a-las-18.33.56-1024x572.png",
    link: "https://www.youtube.com/watch?v=9YqkRU4CWEg",
  },
  {
    title: "Genetic Testing Expert: You Can Get Ahead Of Your Genes",
    description:
      "In this enlightening episode of the Decentralized Opportunity Podcast, Wyatt and Tanner sit down with Dahlia Attia-King, founder of Panacea, a revolutionary at-home genetic exome test that identifies markers for various diseases.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/Captura-de-pantalla-2024-08-14-a-las-18.32.26-1024x573.png",
    link: "https://www.youtube.com/watch?v=NZ8OgyvD1I0",
  },
  {
    title:
      "A Genetic Test Saved Her Life, CEO and Founder Dahlia Attia-King chats about her mission",
    description:
      "A podcast show about entrepreneurship, motivation, leadership, experiences, life lessons and more. For audiences who love self improvement, authentic conversations and more.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/1200x600wp-1024x512.png",
    link: "https://open.spotify.com/episode/6RyPQraqHDqCLDmfqqHqrU?si=FReOZ6TCTR-Q4tAPqgleTw&nd=1&dlsi=74c7ccd8cef24852",
  },
  {
    title:
      "Dahlia Attia-King – Wellness Coaches Helping Clients with Genetic Testing",
    description:
      "Health and wellness coaches can now help people take control of their health in a different way—through genetic testing! People can identify disease risks and make informed healthcare decisions. Dahlia Attia-King discusses genetic testing options—whole exome and genome sequencing.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/08/thcg-podcast-cover-1024x1024.jpg",
    link: "https://thehealthcoachgroup.com/blog/dahlia-attia-king-wellness-coaches-helping-clients-with-genetic-testing/",
  },
  {
    title: "She's Talking About Genetic Testing",
    description:
      "Hailey Reidhead interviews ladies who inspire, uplift, and help you feel seen in this journey of womanhood. Dahlia shares her story about how genetic testing saved her life, and why we should be empowered to get testing done.",
    image: "https://seekpanacea.com/wp-content/uploads/2024/08/626x0w.webp",
    link: "https://podcasts.apple.com/us/podcast/shes-a-lady-podcast/id1638778156?i=1000657908049",
  },
  {
    title:
      "Making Whole Exome Sequencing Affordable, Accessible, Interpretable with Dahlia Attia-King",
    description:
      "Panacea is bringing WES to a broader audience and promoting the value of this data for disease prevention and making smarter lifestyle choices.",
    image: "https://seekpanacea.com/wp-content/uploads/2024/03/626x0w.webp",
    link: "https://empoweredpatientradio.com/making-whole-exome-sequencing-affordable-accessible-interpretable-with-dahlia-attia-king-panacea",
  },
  {
    title:
      "Genetic Health Service Provider, Panacea, Launches to Make Whole Exome Sequencing Accessible to Consumers Without Insurance Barriers",
    description:
      "Whole Exome Sequencing, which has been inaccessible due to narrow medical guidelines and insurance denials, analyzes every currently-known human gene.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/03/Untitled-design-1024x1024.png",
    link: "https://www.healthcaredive.com/press-release/20240227-genetic-health-service-provider-panacea-launches-to-make-whole-exome-sequ/",
  },
  {
    title:
      "Genetic Health Service Provider, Panacea, Launches to Make Whole Exome Sequencing Accessible to Consumers Without Insurance Barriers",
    description:
      "WES, which has been inaccessible due to narrow medical guidelines and insurance denials, analyzes every currently-known human gene in order to identify markers of disease, allowing users to proactively plan for their health in the long term.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/03/Untitled-design-1-1024x1024.png",
    link: "https://www.prnewswire.com/news-releases/genetic-health-service-provider-panacea-launches-to-make-whole-exome-sequencing-accessible-to-consumers-without-insurance-barriers-302074538.html",
  },
  {
    title: "Could Genetic Tests Help You Live Longer and Healthier?",
    description:
      "Join Andrii Buvailo as he talks with Dahlia Attia-King, the founder and CEO of Panacea about the need for increased access and utilization of life-saving clinical genetic testing.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Captura-de-pantalla-2024-02-22-a-las-13.52.40-1024x580.png",
    link: "https://www.youtube.com/watch?v=j1aklKJcq3w",
  },
  {
    title:
      "Genetic Health Service Provider, Panacea, Launches to Make WES Accessible to Consumers Without Insurance Barriers",
    description:
      "Panacea, the one-stop-shop for genetic health services, today announced its nationwide commercial availability.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Panacea-IG-SQUARE-1024x1024.png",
    link: "https://finance.yahoo.com/news/genetic-health-provider-panacea-launches-175600385.html",
  },
  {
    title:
      "Panacea Launches to Help Patients Overcome Barriers to Genetic Testing",
    description:
      "The company is able to offer more accurate testing for a lower price.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Panacea-IG-SQUARE-1-1024x1024.png",
    link: "https://vator.tv/news/2024-02-28-panacea-launches-to-help-patients-overcome-barriers-to-genetic-testing",
  },
  {
    title:
      "Direct-to-Consumer Genome Sequencing Could be Key to the Future of Healthcare",
    description:
      "A growing industry of genetic testing startups, like Florida-based Panacea, is looking to change that. And backers of WES argue that the relatively new tech- which did not exist two decades ago- could be the key to the future of medicine.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/09/Website_Pages_6.jpg",
    link: "https://www.healthcare-brew.com/stories/2023/07/24/direct-to-consumer-genome-sequencing-could-be-key-to-the-future-of-healthcare",
  },
  {
    title:
      "Panacea Revolutionizes Genetic Testing, Expanding Nationwide for Enhanced Healthcare Accessibility",
    description:
      "Panacea is revolutionizing genetic testing by making comprehensive tests affordable and accessible. Learn about their innovative approach and the potential implications for healthcare.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Panacea-IG-SQUARE-2-1024x1024.png",
    link: "https://bnnbreaking.com/world/us/panacea-revolutionizes-genetic-testing-expanding-nationwide-for-enhanced-healthcare-accessibility",
  },
  {
    title:
      "Genetic Health Service Provider, Panacea, Launches to Make WES Accessible",
    description:
      "Whole Exome Sequencing, which has been inaccessible due to narrow medical guidelines and insurance denials, allows users to proactively plan for their health in the long term.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Panacea-IG-SQUARE-3-1024x1024.png",
    link: "https://www.citybiz.co/article/520396/genetic-health-service-panacea-launches-to-make-whole-exome-sequencing-accessible/",
  },
  {
    title:
      "Product Development 101: Creativity, Innovation and How to Solve Problems",
    description:
      "In this episode, Nicole and Romi dive headfirst into product development. Learn how to develop the product that sells directly to your target audience.",
    image: "https://seekpanacea.com/wp-content/uploads/2023/11/download.jpeg",
    link: "https://open.spotify.com/episode/4RveSn5a8ZE4YWoTzcfMR6?si=6L9arI_gQsuLCZIyYubeNQ",
  },
  {
    title:
      "Transforming Lives Through Accesible Genetic Testing with Dahlia Attia-King",
    description:
      "Join us as Panacea Founder and CEO, Dahlia Attia-King, explores the transformative potential of clinical genetic testing, and how Panacea is breaking down barriers and revolutionazing healthcare accessibility to empower individuals in taking control of their health with disease prevention.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/11/Screenshot-2023-11-23-at-22.57.22-1024x335.png",
    link: "https://www.advisorpedia.com/podcasts/transforming-lives-through-accessible-genetic-testing-with-dahlia-attia-king/",
  },
  {
    title:
      "Genetic Code. How One Boyntone Beacher is Helping Others Take Control of Their Health",
    description:
      "Panacea and our CEO, Dahlia Attia-King, are featured in the February issue of Palm Beach Illustrated magazine. In this exclusive interview, Dahlia shares the inspiring story of how Panacea's Whole Exome Sequencing genetic testing saved her and her sister's lives.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2024/02/Screen-Shot-2024-02-01-at-10.23.17-PM-849x1024.jpg",
    link: "https://issuu.com/pbmg/docs/pbi_0224/208.",
  },
  {
    title: "Love & Life with Carol Riddick",
    description:
      "Dahlia and Carol chat about genetic testing, with a focus on our Whole Exome Sequencing test (Dahlia's segment begins at min 1:08:49)",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/10/Screenshot-2023-10-04-at-12.43.59-1024x575.png",
    link: "https://www.facebook.com/watch/?v=816356956533786",
  },
  {
    title: "The Brooklyn Cafe TV Show",
    description:
      "Dahlia interviews at The Brooklyn Cafe TV show hosted by Dawn & Freddy S.",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/10/Screenshot-2023-10-04-at-12.33.24-1024x535.png",
    link: "https://www.facebook.com/thebrooklyncafetv/videos/1112095759751200",
  },
  {
    title: "The Complex Road To Simplicity",
    description:
      "Dahlia takes us on her journey of founding Panacea and pushing healthcare into a much needed era of modernization",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/10/Panacea-squared-4-1024x1024.png",
    link: "https://creativemornings.com/talks/dahlia-attia-king/1",
  },
  {
    title: "How to Access Genetic Testing that Could Save Your Life",
    description:
      "Our thought-leading founder, Dahlia, explains how to get in control your health",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/10/64a58c857795a0960fa8ea91_The-Daily-Drip-Blog-3-1-1024x683.png",
    link: "https://www.thedailydrip.com/post/how-to-access-genetic-testing-that-could-save-your-life",
  },
  {
    title: "#215 Preventative Health via Whole Exome Sequencing",
    description:
      "Dahlia interviews with DNA Today: A Genetics Podcast with Kira Dineen",
    image: "https://seekpanacea.com/wp-content/uploads/2023/10/626x0w.webp",
    link: "https://podcasts.apple.com/us/podcast/dna-today-a-genetics-podcast/id1209263436?i=1000590378888",
  },
  {
    title: "Ep. #45 In Your Genes",
    description:
      "A deep and rich conversation about Dahlia’s passion for genetic testing and clinical Whole Exome Sequencing",
    image:
      "https://seekpanacea.com/wp-content/uploads/2023/10/Screenshot-2023-10-04-at-12.49.56-1024x1006.png",
    link: "https://open.spotify.com/episode/1bzaRXLMx0gJ12fspXLM42?si=muiwRj7VR8iWVGgB4b7-rg",
  },
];

const page: FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="py-20 text-center mx-auto md:px-20 px-5">
        <h1 className="text-white text-4xl font-semibold mb-10">
          Media & Press
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300 rounded-r-3xl"
                    unoptimized
                  />
                </div>
              </a>
              <h2 className="text-accent-gold underline text-xl font-semibold hover:underline">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h2>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <PanacceaLogo isHR={false} />
      <Footer />
    </div>
  );
};

export default page;

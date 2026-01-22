import { FC } from "react";
import PanacceaLogo from "../components/sections/PanacceaLogo";
import Footer from "../components/layout/Footer";
import ImageTile from "./ImageTile";

const data = [
  {
    name: "Dahlia Attia-King",
    link: "https://www.linkedin.com/in/dahlia-attia-king-8b532094/",
    src: "dahlia.jpg",
    position: "Founder & CEO",
  },
  {
    name: "Melanie Shapiro, PhD",
    link: "https://www.linkedin.com/in/melshapiro/",
    src: "melanie.jpeg",
    position: "Advisor",
  },
  {
    name: "Hinco Gierman, PhD",
    link: "https://www.linkedin.com/in/hincogierman/",
    src: "hinco.png",
    position: "Scientific Advisor",
  },
  {
    name: "Dr. Whitney Jones, MD",
    link: "https://www.linkedin.com/in/whitney-jones-17113216/",
    src: "whitney.jpg",
    position: "Medical Advisor",
  },
  {
    name: "Matt Tschirgi, MS, CGC",
    link: "https://www.linkedin.com/in/eunice-gonz%C3%A1lez-71484066/",
    src: "matt.jpeg",
    position: "Genetic Counselor",
  },
  {
    name: "Ryan Shea",
    link: "https://www.linkedin.com/in/ryaneshea/",
    src: "Ryan.png",
    position: "Advisor",
  },
  {
    name: "Oscar Callejas",
    link: "https://www.linkedin.com/in/ocallejas/",
    src: "oscar.jpeg",
    position: "Advisor",
  },
];

const page: FC = () => {
  return (
    <div className="bg-black ">
      <div className="py-20 text-center  mx-auto md:px-48">
        <h1 className="text-accent-teal text-4xl font-semibold">WHO WE ARE</h1>
        <p className="text-white mx-auto text-xl mt-5">
          Panacea is supported by a diverse group of innovators, scientists and
          entrepreneurs with healthcare, technology and business backgrounds.
          Each individual adds invaluable perspective, experience and
          outside-of-the-box thinking.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center p-10 gap-y-10">
        <div className="flex flex-wrap justify-center gap-10">
          {data.slice(0, 4).map((dd) => (
            <ImageTile name={dd.name} src={`/${dd.src}`} key={dd.name} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {data.slice(4).map((dd) => (
            <ImageTile name={dd.name} src={`/${dd.src}`} key={dd.name} />
          ))}
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

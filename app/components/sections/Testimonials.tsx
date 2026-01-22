"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: {
    quote: string;
    author: string;
    years: string;
    imageSrc: string;
  };
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = testimonial.quote.length > 150;

  return (
    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 pt-12 mt-8 h-full flex flex-col">
      <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 text-white">
        {testimonial.imageSrc ? (
          <Image
            alt={testimonial.author}
            src={testimonial.imageSrc}
            width={60}
            height={60}
            className="rounded-full"
          />
        ) : (
          <div className=" bg-pink-800 w-[60px] h-[60px] flex items-center justify-center rounded-full">
            <p className="font-semibold text-xl">{testimonial.author[0]}</p>
          </div>
        )}
        <Image
          src="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
          alt="Google"
          width={25}
          height={25}
          className="absolute bottom-0 right-0 bg-white rounded-full"
        />
      </div>

      <div className="text-white text-center mt-2 font-semibold">
        {testimonial.author}
      </div>
      <div>
        <p className="text-center text-gray-500 text-sm mb-4">
          {testimonial.years} years ago
        </p>
      </div>
      <div
        className={`text-white text-center ${!isExpanded ? "line-clamp-4" : ""}`}
      >
        {testimonial.quote}
      </div>
      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 text-sm mt-4 hover:underline self-center"
        >
          {isExpanded ? "Hide" : "Read More"}
        </button>
      )}
    </div>
  );
};

const TESTIMONIALS = [
  {
    quote:
      "I am grateful to have been the recipient of Panacea’s Whole Exome Sequencing giveaway! From start to finish, I found them to be gracious and eager to make the experience as seamless as possible for my family and me. I was incredibly impressed that the founder and COE, Dahlia Attia-King, took time out of her busy schedule to speak with me for over an hour about my family’s experience and with a passion for understanding and serving her clients. The testing itself was easy to complete with a quick turnaround time. I also appreciate that all of their clients have the opportunity to speak with a genetic counselor about their results as part of the cost of this testing. Genetic counselors can help clients to understand their test results better, and provide reliable resources. From the next steps post-testing, to information on various genetic conditions, cancer risks, carrier status, and so much more - genetic counseling is truly such a vital component of this testing package.",
    author: "Mary Shinaberry",
    years: "2",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMSDW7MhQhLTIyM1rtu0R92msY3a3eVrjvuvUdE70w=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
  {
    quote:
      "The team at Panacea is very knowledgable about the entire process of genetic testing and how this type of testing can play a part in preventative healthcare. I had a few non-medical issues arise during the process, and the team was great to work with along each step of the way. They were kind, considerate, and communicative; you can tell there are people behind the product.",
    author: "Casey McCann",
    years: "2",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMSWkcbevwayWkAZENlDVfGjCzqxihuDyiaLYfLa=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
  {
    quote:
      "What an incredible thing it is to have a company like Panacea that allows you to create a preventative health journey. The testing itself was a very easy and simple process. Instructions were clear and easy to understand and the results were shared in an easy to digest manner. If you are looking into genetic testing, I highly recommend choosing Panacea, great company, great mission.",
    author: "Heather Murrey",
    years: "2",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMTdJSFNjFi6Z1304nSaj7FXomw2rbG4Yzfoj6z1=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
  {
    quote:
      "Simple ordering experience, helpful team. The product itself is easy to use and the results were powerful for me!",
    author: "Melanie Shapiro",
    years: "3",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMTZ3ZUdzJRx6AUp6qkNbs3AW-8JoRvdmUZYr4IJcw=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
  {
    quote:
      "After testing with Panacea, I got peace of mind of knowing that I’m not a carrier for any actionable disease-related genes. Knowing what you don’t carry genetic risk for is equally as impactful as finding out what you do carry the risk for, so it’s a win win to do the test! The process was simple and easy and I had my results within a few weeks.",
    author: "Danielle D",
    years: "3",
    imageSrc: "",
  },

  {
    quote:
      "Was smooth and easy. Great to do with your partner if you are planning to have kids; or if you just wanted to know what you might have higher risks of. Was super easy and everyone at Panacea was nice & helpful whenever I had a question.",
    author: "Ryan Van Milligen",
    years: "3",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMQgjm0MF0yOnrdl08hsntrzmwlzR1mGl9K44G60D7I=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
  {
    quote:
      "Affordable, easy to navigate and results were ready in a timely manner.",
    author: "Dr. Arghavan Welch",
    years: "3",
    imageSrc: "",
  },
  {
    quote:
      "I had a great experience using this service. It was easy, quick and streamlined. I highly recommend.",
    author: "Gardens Orthodontics",
    years: "3",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMSgQtrgU0Hh3xj54cNLcwbXKe8tmvC1-F8rAFDyrQ=w64-h64-c-c-rp-w64-h64-mo-br100",
  },

  {
    quote:
      "Panacea quite literally might have saved my life! I approached this with curiosity mostly, but what I ended up with was a sense of immense gratitude and wonder at how much information is contained in our genome and just how much we can do with that information if we have it early enough. Thankfully, I do have the information early and I'm taking action now!",
    author: "Jasmin Attia",
    years: "3",
    imageSrc: "",
  },
  {
    quote:
      "Seamless, very easy to understand testing process. I’ve done mail lab testing before and this was by far the easiest and most convenient method. The results were comprehensive and provided more insight than what I received from another lab. The follow-up call was also informative and gave me actionable steps to take based on my results. Would highly recommend to everyone!",
    author: "Renata Reese",
    years: "3",
    imageSrc:
      "https://lh3.googleusercontent.com/a-/AD_cMMT-6mW_9yn_ROGSex3LlDBcLLcMXNkw-EJSPb7G=w64-h64-c-c-rp-w64-h64-mo-br100",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-12 overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
        </div>

        {/* Fallback testimonials if widget fails */}
        <div className="flex gap-8 animate-marquee">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <div key={index} className="w-[300px] md:w-[400px] flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

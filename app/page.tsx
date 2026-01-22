import Footer from "./components/layout/Footer";
import Accreditation from "./components/sections/Accreditation";
import Copyright from "./components/sections/Copyright";
import FeaturedIn from "./components/sections/FeaturedIn";
import HeroBanner from "./components/sections/HeroBanner";
import HowItWorks from "./components/sections/HowItWorks";
import JoinUs from "./components/sections/JoinUs";
import NewsFeature from "./components/sections/NewsFeature";
import Newsletter from "./components/sections/Newsletter";
import PanacceaLogo from "./components/sections/PanacceaLogo";
import PartnerLogos from "./components/sections/PartnerLogos";
import Testimonials from "./components/sections/Testimonials";
import WhyWES from "./components/sections/WhyWES";
import Logo from "./components/ui/Logo";

export default function HomePage() {
  return (
    <>
      <HeroBanner videoSrc="https://odeskthemes.com/04/seekpanacea/wp-content/uploads/2023/04/video-main-banner.mp4" />

      <FeaturedIn />

      <PartnerLogos />

      <NewsFeature />

      <HowItWorks />

      <WhyWES />

      <Testimonials />

      <Accreditation />
      <PanacceaLogo isHR={true} />
      <div className="bg-[#101010]">
        <JoinUs />
        <Footer />
        <Copyright />
      </div>

      {/* <Newsletter /> */}
    </>
  );
}

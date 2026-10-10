import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Portfolio, PortfolioCta } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { Journey } from "@/components/Journey";
import { WhyUs } from "@/components/WhyUs";
import { CaseStudies } from "@/components/CaseStudies";
import { Reviews } from "@/components/Reviews";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <Portfolio />
        <PortfolioCta />
        <Services />
        <Journey />
        <WhyUs />
        <CaseStudies />
        <Reviews />
        <About />
        <Process />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

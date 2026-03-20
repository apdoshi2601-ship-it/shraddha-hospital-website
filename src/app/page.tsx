import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileCTABar from "@/components/layout/MobileCTABar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Specialities from "@/components/sections/Specialities";
import PatientTools from "@/components/sections/PatientTools";
import Doctors from "@/components/sections/Doctors";
import SpineHub from "@/components/sections/SpineHub";
import Testimonials from "@/components/sections/Testimonials";
import Insurance from "@/components/sections/Insurance";
import Appointment from "@/components/sections/Appointment";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Specialities />
        <PatientTools />
        <Doctors />
        <SpineHub />
        <Testimonials />
        <Insurance />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileCTABar />
    </>
  );
}

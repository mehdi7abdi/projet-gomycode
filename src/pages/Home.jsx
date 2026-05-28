import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import Footer from "../sections/Footer";
import Category from "../sections/Category";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-main">
        <Hero />
        <Category />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

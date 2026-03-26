import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <h1>Test</h1>
       <Navbar />
      <Hero />
      <About />
      <Resume />
      <Projects />
      <Skills />
      <Contact />
      <Footer /> 
    </main>
  );
};

export default Index;
import { motion } from "motion/react"
import wolfSymbol from "@/assets/wolf-symbol.png";
import Particles from "./Particles";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Cosmic aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent blur-3xl animate-glow-pulse" />

      <Particles />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Wolf Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={wolfSymbol}
            alt="Wolf symbol - Leonardo Bastos"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto animate-float rounded-2xl"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          Leonardo <span className="text-gradient">Bastos</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground font-display tracking-wide mb-6"
        >
          Front-End Developer{" "}
          <span className="text-primary">|</span> React & TypeScript
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable, high-performance interfaces with precision and clarity.
          Architecture-driven development for products that demand excellence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)] hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-lg glow-border text-foreground font-display font-medium tracking-wide transition-all duration-300 hover:bg-muted/50 hover:-translate-y-0.5"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

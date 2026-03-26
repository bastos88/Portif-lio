import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
              From Engineering to Code
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With a foundation in engineering, I transitioned to software development 
              driven by a passion for building systems that are both functional and elegant. 
              My engineering background shapes my approach — everything is architecture, 
              structure, and intentional design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I specialize in React and TypeScript ecosystems, creating interfaces that 
              prioritize performance, accessibility, and maintainability. Every line of 
              code serves a purpose.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {[
              { label: "Logic & Architecture", desc: "Structured thinking applied to every component and system design." },
              { label: "Performance First", desc: "Optimized rendering, lazy loading, and efficient state management." },
              { label: "Clean Code", desc: "Readable, testable, and scalable — code that communicates intent." },
              { label: "Pixel Precision", desc: "Obsessive attention to detail in layout, spacing, and interaction." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <div>
                  <h4 className="font-display font-medium text-foreground mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

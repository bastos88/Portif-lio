import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, FileText } from "lucide-react";
import resumePdf from "../assets/Leonardo Bastos - Web developer.pdf";

const Resume = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-24 md:py-32 px-6 bg-muted/20" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            My <span className="text-gradient">Resume</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Download my CV to learn more about my experience, education, and technical skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href={resumePdf}
            download
            className="group flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)] hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download CV
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-lg glow-border text-foreground font-display font-medium tracking-wide transition-all duration-300 hover:bg-muted/50 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5" />
            View Online
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;

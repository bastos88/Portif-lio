import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Tools",
    skills: ["Git", "VS Code", "Figma", "Vite", "Storybook", "Jest", "Docker"],
  },
  {
    title: "Backend Basics",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Firebase", "Supabase"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Skills & <span className="text-gradient">Tools</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="p-6 rounded-xl bg-card glow-border"
            >
              <h3 className="text-lg font-display font-semibold text-primary mb-5">{cat.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-body rounded-md bg-muted text-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import travelgramImg from "@/assets/project-travelgram.png";
import oldbladeImg from "@/assets/oldblade.png";
import coffeeDeliveryImg from "@/assets/coffee-delivery.png";

const projects = [
  {
    title: "Travelgram",
    description:
      "A travel-inspired social platform showcasing destinations with a beautiful photo grid, user profiles, and exploration features.",
    stack: ["HTML", "CSS"],
    image: travelgramImg,
    url: "https://travelgram-two-kappa.vercel.app/",
  },
   {
    title: "OldBlade",
    description:
      "OldBlade is a web application designed to make it easier to book haircuts at barbershops or salons. The focus is on a simple, responsive, and functional user experience, with a modern and intuitive interface.",
    stack: ["HTML", "CSS", "JavaScript","JSON Server"],
    image: oldbladeImg,
    url: "https://old-blade.vercel.app/",
  },
  {
    title: "Coffee Delivery",
    description:
      "Coffee ordering platform that allows users to choose, customize, and receive different types of coffee quickly and conveniently, wherever they are.",
    stack: ["HTML", "CSS", "JavaScript","JSON Server", "TypeScript", "React", "Vite"],
    image: coffeeDeliveryImg,
    url: "https://coffee-delivery.vercel.app/",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-muted/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group rounded-xl bg-card glow-border overflow-hidden transition-all duration-500 glow-border-hover hover:-translate-y-1 block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={`Preview of ${project.title}`}
                  className="w-full h-52 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-card/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-foreground" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-display rounded-md bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

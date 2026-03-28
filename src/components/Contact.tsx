import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xkopopyg";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('message', formData.message);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-muted/20" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-5 mb-12"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card glow-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors duration-300"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card glow-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors duration-300"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-card glow-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/40 transition-colors duration-300 resize-none"
            required
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-display font-medium tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)] hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-green-500 mt-2" role="status">
              Mensagem enviada! Obrigado — vou responder em breve.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500 mt-2" role="alert">
              Erro ao enviar a mensagem. Tente novamente mais tarde.
            </p>
          )}

          {FORMSPREE_ENDPOINT.includes('YOURENDPOINT') && (
            <p className="text-xs text-muted-foreground mt-2">
              Tip: configure `VITE_FORMSPREE_ENDPOINT` com seu endpoint do Formspree.
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-5 justify-center"
        >
          {[
            { icon: Github, href: "https://github.com/bastos88", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/leoonardobastos", label: "LinkedIn" },
            { icon: Mail, href: "mailto:bastos88leonardo@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-lg glow-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/40 hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

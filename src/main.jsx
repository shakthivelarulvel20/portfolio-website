import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowDownRight, ArrowUpRight, Code2, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import './styles.css';

const skills = ['Python', 'Java', 'SQL', 'FastAPI', 'Spring Boot', 'Next.js', 'ReactJS', 'AWS', 'Docker', 'LLM Integration', 'Data Structures & Algorithms', 'Agile / Scrum'];
const experiences = [
  { date: 'MAR 2024 - JUL 2026', company: 'Conshan Digital', role: 'Software Development Engineer', text: 'Owned features end-to-end, from root-cause analysis through production release. Partnered closely with product and QA in Agile/Scrum cycles to ship resilient ReactJS, Spring Boot, and FastAPI systems; strengthened delivery skills by containerizing environments with Docker and deploying production services on AWS.' },
  { date: 'DEC 2024 - FEB 2025', company: 'TCS iON', role: 'Software Engineering Intern', text: 'Coordinated directly with client-side stakeholders to capture requirements and produce technical documentation. Designed an OCR pipeline from scratch using CNNs and Tesseract, then applied rigorous root-cause analysis to isolate edge cases, achieving 92% accuracy and reducing manual entry time by 40%.' }
];
const projects = [
  { n: '01', title: 'Klaros AI', type: 'Enterprise Document Intelligence Pipeline', tech: 'Java / Spring Boot / Hibernate / Groq API / Llama 3', color: 'blue', catalyst: 'Built to replace slow, fragmented document operations with an intelligent system that turns unstructured files into reliable, usable data.', problem: 'Manual document workflows create bottlenecks, introduce errors, and keep teams waiting on information they need to make decisions.', differentiator: 'Built entirely from scratch in 30 days. Groq API and Llama 3 power structured extraction, cutting document processing time by 60%.' },
  { n: '02', title: 'Aura - AI Journaling', type: 'Mental Wellness Application', tech: 'Next.js / FastAPI / Groq API / Sentiment Analysis', color: 'violet', catalyst: 'Created to make everyday reflection feel responsive, supportive, and genuinely personal rather than another static wellness checklist.', problem: 'Most wellness applications lack personalized, real-time emotional tracking, leaving users with generic feedback and little continuity.', differentiator: 'A custom Validation-First AI persona, dynamic system prompts, and a sentiment pipeline deliver considered guidance with sub-2-second inference latency.' }
];
const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.16, 1, .3, 1] } } };
const slideUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
function Magnetic({ children, className = '', href, onClick, ...props }) {
  const ref = useRef(null); const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 12 }); const sy = useSpring(y, { stiffness: 180, damping: 12 });
  const move = e => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .2); y.set((e.clientY - r.top - r.height / 2) * .2); };
  return <motion.a {...props} ref={ref} href={href} onClick={onClick} className={className} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.a>;
}

function TiltCard({ project }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useTransform(y, [-.5, .5], ['7deg', '-7deg']); const rotateY = useTransform(x, [-.5, .5], ['-7deg', '7deg']);
  return <motion.article className={`project-card ${project.color}`} style={{ rotateX, rotateY }} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - .5); y.set((e.clientY - r.top) / r.height - .5); }} onMouseLeave={() => { x.set(0); y.set(0); }}>
    <div className="card-top"><span>{project.n}</span><ArrowUpRight size={21} /></div><div className="orb" />
    <div className="project-copy"><p className="eyebrow">{project.type}</p><h3>{project.title}</h3><span className="tech">{project.tech}</span>
      <dl className="project-deep-dive"><div><dt>The Catalyst</dt><dd>{project.catalyst}</dd></div><div><dt>The Real-World Problem</dt><dd>{project.problem}</dd></div><div><dt>The Differentiator</dt><dd>{project.differentiator}</dd></div></dl>
    </div>
  </motion.article>;
}

function Marquee({ reverse = false }) { const items = [...skills, ...skills]; return <div className="marquee"><div className={`marquee-track ${reverse ? 'reverse' : ''}`}>{items.map((s, i) => <span className="skill" key={`${s}-${i}`}>{s}<i /></span>)}</div></div>; }

function App() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const lenis = new Lenis({ lerp: .09, smoothWheel: true }); let id; const loop = t => { lenis.raf(t); id = requestAnimationFrame(loop); }; id = requestAnimationFrame(loop); return () => { cancelAnimationFrame(id); lenis.destroy(); }; }, []);
  const scrollToSection = event => { const target = document.querySelector(event.currentTarget.getAttribute('href')); if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } setOpen(false); };
  return <><div className="noise" /><div className="cursor-glow" />
    <header><a className="logo" href="#top">S<span>A</span>.</a><nav className={open ? 'open' : ''}>{['About', 'Experience', 'Work', 'Contact'].map(item => <a onClick={scrollToSection} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></header>
    <main id="top">
      <section className="hero"><div className="mesh mesh-one" /><div className="mesh mesh-two" /><div className="particles">{Array.from({ length: 22 }, (_, i) => <b key={i} style={{ '--x': `${(i * 47) % 100}%`, '--y': `${(i * 71) % 100}%`, '--d': `${4 + i % 5}s` }} />)}</div>
        <div className="hero-layout"><div className="hero-copy"><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }} className="eyebrow hero-tag">AVAILABLE FOR SELECTED OPPORTUNITIES <span /></motion.p><h1 aria-label="Shakthivel A"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>SHAKTHIVEL</motion.span><motion.em initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .12, ease: [.16, 1, .3, 1] }}>A</motion.em></h1><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }} className="hero-intro"><p>Software Development Engineer crafting resilient backend systems and intelligent product experiences. I combine <strong>Python, Java, FastAPI, and Spring Boot</strong> to ship scalable, production-ready software with meaningful LLM capabilities.</p><p className="hero-detail">I design the layer beneath great products: fast APIs, cloud-ready services, and thoughtful AI workflows that are observable, maintainable, and built to grow.</p><div className="hero-highlights"><span><b>01</b> Backend Architecture </span><span><b>02</b> LLM Integration </span><span><b>03</b> Cloud Delivery</span></div></motion.div></div>
          <motion.div initial={{ opacity: 0, scale: .92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .45, duration: .7 }} className="profile-frame"><span className="profile-halo" /><img src="./assets/profile.png" alt="Shakthivel A" onError={event => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.classList.add('image-unavailable'); }} /><span className="profile-fallback">SA</span><p>SDE / AI SYSTEMS</p><span className="profile-mark"></span></motion.div></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }} className="hero-bottom"><p>From robust APIs to LLM-enabled workflows,<br /><span>built for real-world scale and reliability.</span></p><div className="hero-actions"><Magnetic className="button primary" href="#work">View Work <ArrowDownRight size={17} /></Magnetic><Magnetic className="button ghost" href="#contact">Contact Me</Magnetic></div></motion.div><a className="scroll-cue" href="#about">SCROLL TO EXPLORE <span>↓</span></a>
      </section>
      <motion.section
        id="about"
        className="about section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideUp}><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={reveal}><p className="section-index">ABOUT</p><div className="about-grid"><h2>I engineer dependable systems where <i>intelligence</i> creates an edge.</h2><div className="about-copy"><p className="body-copy">I am a Software Development Engineer with 2+ years of experience building and deploying full-stack and backend systems in production environments. My work lives at the intersection of dependable engineering and applied AI: architecting clean REST APIs, cloud-ready services, and thoughtful LLM integrations.</p><p className="body-copy">With Python, Java, FastAPI, and Spring Boot as core tools, I turn complex requirements into scalable, maintainable products. Every solution is shaped around production realities: performance, deployment, observability, and an experience that feels seamless to the people using it.</p></div></div></motion.div></motion.section>
      <motion.section
        id="experience"
        className="section experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideUp}><div className="section-title"><p className="section-index">EXPERIENCE</p><h2>Building with ownership.</h2></div><div className="timeline">{experiences.map((e, i) => <motion.article variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} transition={{ delay: i * .12 }} className="timeline-row" key={e.company}><div className="dot" /><p className="date">{e.date}</p><div><h3>{e.company}</h3><p className="role">{e.role}</p></div><p className="experience-text">{e.text}</p></motion.article>)}</div></motion.section>
      <motion.section
        id="work"
        className="section work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideUp}><div className="section-head"><div className="section-title"><p className="section-index">SELECTED WORK</p><h2>Selected work.</h2></div><p>Systems with clarity,<br />intent and impact.</p></div><div className="project-grid">{projects.map(p => <TiltCard project={p} key={p.title} />)}</div></motion.section>
      <motion.section
        className="skills-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideUp}><div className="section-title"><p className="section-index">TOOLKIT</p><h2>Tools that ship.</h2></div><Marquee /><Marquee reverse /></motion.section>
      <motion.section
        id="contact"
        className="contact section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slideUp}><div className="contact-glow" /><p className="section-index">GET IN TOUCH</p><motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="contact-content"><div className="contact-copy"><h2 className="contact-label">BUILDING<br />WITH PURPOSE</h2><blockquote>Engineering the future by bridging the gap between <i>intelligent AI systems</i> and seamless human experiences.</blockquote><a className="email-link" href="mailto:shakthivelarulvel20@gmail.com">shakthivelarulvel20@gmail.com <ArrowUpRight /></a></div><div className="contact-panel"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="contact-core">CONNECT<span /></div><div className="contact-socials"><Magnetic className="contact-link" href="https://github.com/shakthivelarulvel20" aria-label="GitHub"><Github /> <span>GitHub</span><ArrowUpRight size={19} /></Magnetic><Magnetic className="contact-link" href="https://www.linkedin.com/in/shakthivel-a-b873b5278/" aria-label="LinkedIn"><Linkedin /> <span>LinkedIn</span><ArrowUpRight size={19} /></Magnetic><Magnetic className="contact-link" href="https://leetcode.com/" aria-label="LeetCode"><Code2 /> <span>LeetCode</span><ArrowUpRight size={19} /></Magnetic><Magnetic className="contact-link" href="mailto:shakthivelarulvel20@gmail.com" aria-label="Email"><Mail /> <span>Email</span><ArrowUpRight size={19} /></Magnetic></div></div></motion.div></motion.section>
    </main>
    <footer><span>© 2026 SHAKTHIVEL A</span><div className="socials"><Magnetic className="social" href="https://github.com/shakthivelarulvel20" aria-label="GitHub"><Github size={18} /></Magnetic><Magnetic className="social" href="https://www.linkedin.com/in/shakthivel-a-b873b5278/" aria-label="LinkedIn"><Linkedin size={18} /></Magnetic><Magnetic className="social" href="mailto:shakthivelarulvel20@gmail.com" aria-label="Email"><Mail size={18} /></Magnetic></div><span>BORN TO CODE. LIVE TO DEBUG</span></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

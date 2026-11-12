import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Featured } from './components/Featured';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

const Divider = () => <div aria-hidden="true" className="divider container-page !px-0" />;

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden="true" className="ambient" />
      <div aria-hidden="true" className="grain" />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-purple to-pink"
      />
      <Nav />
      <main>
        <Intro />
        <Hero />
        <Divider />
        <Featured />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

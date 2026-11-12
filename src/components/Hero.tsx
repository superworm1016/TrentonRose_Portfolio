import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/resume';
import { IdeMock } from './IdeMock';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease },
});

export function Hero() {
  return (
    <section id="home" className="relative overflow-x-clip pb-20 pt-28 md:pb-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute right-[-10%] top-10 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[130px]" />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-12">
        <div>
          <motion.div {...fadeUp(0)} className="flex items-center gap-4">
            <div className="relative">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent via-indigo to-purple p-[2px]">
                <div className="grid h-full w-full place-items-center rounded-full bg-bg text-xl font-bold">
                  {profile.initials}
                </div>
              </div>
              <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg bg-green" />
            </div>
            <div>
              <p className="font-mono text-xs text-t3">hello, world — I'm</p>
              <p className="flex items-center gap-1 text-sm text-t2">
                <MapPin className="h-3.5 w-3.5" /> {profile.location}
              </p>
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-[4.1rem] lg:leading-[1.02]"
          >
            {profile.name}
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mt-3 text-xl font-semibold sm:text-2xl">
            <span className="text-gradient">{profile.title}</span>
          </motion.p>
          <motion.p {...fadeUp(0.12)} className="mt-1 font-mono text-sm text-t3">
            {profile.headline}
          </motion.p>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-[17px] leading-relaxed text-t2">
            {profile.summary}
          </motion.p>

          <motion.ul {...fadeUp(0.2)} className="mt-6 flex flex-wrap gap-2" aria-label="Core stack">
            {profile.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap gap-2.5">
            <a href="#projects" className="btn-primary">
              View projects <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-ghost px-4">
              <Mail className="h-4 w-4" /> Get in touch
            </a>
            <a href={profile.cv} download className="btn-ghost px-4" aria-label="Download CV (PDF)">
              <Download className="h-4 w-4" /> CV
            </a>
          </motion.div>

          <motion.dl {...fadeUp(0.28)} className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-xl font-bold tracking-tight sm:text-2xl">{f.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-t3 sm:text-sm">{f.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          style={{ transformPerspective: 1200 }}
          className="min-w-0"
        >
          <IdeMock />
          <p className="mt-4 text-center font-mono text-xs text-t3">
            Click a file or hit ▶ to rebuild. Sample code, illustrating the stack.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

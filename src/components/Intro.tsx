import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Lock, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/resume';

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

/** Lock-screen style intro: live clock that lifts away as you scroll. */
export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const now = useNow();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).replace(/\s?[AP]M$/i, '');
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <section id="top" ref={ref} aria-label="Intro" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      {/* Wallpaper */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vh] rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute -right-1/4 top-[20%] h-[60vh] w-[60vh] rounded-full bg-purple/25 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-1/3 h-[50vh] w-[50vh] rounded-full bg-indigo/25 blur-[120px]" />
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      <motion.div
        style={{ opacity, y, scale }}
        className="relative flex h-full flex-col items-center px-4 pt-24 text-center sm:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-t2"
        >
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium sm:text-base">{date}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 bg-gradient-to-b from-t1 to-t2 bg-clip-text text-[clamp(5.5rem,22vw,10rem)] font-bold leading-none tracking-tight text-transparent tabular-nums"
          aria-label={`Current time ${time}`}
        >
          {time}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-t2">
            <MapPin className="h-3.5 w-3.5" /> {profile.location}
          </span>
          <span className="glass inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-t2">
            {profile.headline}
          </span>
        </motion.div>

        {/* Notification */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 180, damping: 20 }}
          className="glass mt-10 w-full max-w-sm rounded-[22px] border border-line p-3.5 text-left shadow-2xl transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-gradient-to-br from-accent to-purple text-sm font-bold text-white">
              {profile.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{profile.name}</p>
                <p className="text-xs text-t3">now</p>
              </div>
              <p className="text-sm text-t2">{profile.title}</p>
              <p className="mt-0.5 text-sm leading-snug text-t3">
                Java services, React web apps and React Native for iOS. Tap or scroll to explore.
              </p>
            </div>
          </div>
        </motion.a>

        <a
          href="#home"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-t3 transition-colors hover:text-t1"
        >
          <span className="text-sm font-medium">Scroll to unlock</span>
          <ChevronDown className="h-5 w-5 animate-bob" />
          <span className="mt-2 h-1.5 w-32 rounded-full bg-[var(--text-2)]" />
        </a>
      </motion.div>
    </section>
  );
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Layers,
  Lock,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { useCallback, useState, type ReactNode } from 'react';
import { Reveal, SectionHeading, Spotlight } from './ui';

type Slide = {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
};

/* ---------- Slide visuals (pure HTML/CSS illustrations) ---------- */

function ChatVisual() {
  return (
    <div className="flex h-full flex-col gap-3 p-5 sm:p-7">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-accent">
          <Sparkles className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold">Engineering Knowledge Assistant</p>
        <span className="ml-auto rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-semibold text-green">SSO</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-sm text-white"
      >
        Where is the retry policy for the payments service documented?
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-elev2/70 px-3.5 py-2.5 text-sm text-t2"
      >
        <p>
          It's covered in the payments service runbook, with the backoff limits in the related architecture
          decision record.
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[10.5px] text-t3">retrieved:</span>
          {['runbooks/payments.md', 'adr/retry-policy.md'].map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-md bg-bg/70 px-2 py-0.5 font-mono text-[10.5px] text-t3">
              <FileText className="h-3 w-3" /> {s}
            </span>
          ))}
        </div>
      </motion.div>
      <div className="mt-auto flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-3 py-2 text-sm text-t3">
        <Search className="h-4 w-4" /> Ask about the docs…
      </div>
    </div>
  );
}

function PipelineVisual() {
  const steps = [
    { icon: FileText, label: 'Docs', sub: 'PDF · MD · HTML' },
    { icon: Scissors, label: 'Chunk', sub: 'split + clean' },
    { icon: Layers, label: 'Embed', sub: 'semantic vectors' },
    { icon: Database, label: 'Index', sub: 'vector store' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-5 sm:p-8">
      <p className="font-mono text-xs text-t3">{'$ ingest --source ./docs'}</p>
      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-0">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center sm:flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              className="flex w-full flex-col items-center gap-1.5 rounded-2xl border border-line bg-elev2/70 px-2 py-4 text-center"
            >
              <s.icon className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold">{s.label}</span>
              <span className="text-[10.5px] text-t3">{s.sub}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="relative mx-1 hidden h-px w-6 shrink-0 overflow-hidden bg-line sm:block">
                <span className="absolute inset-y-0 left-0 w-2 animate-flow bg-accent" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-line bg-bg/60 p-3 font-mono text-[11px] leading-relaxed text-t3">
        <p>
          <span className="text-green">✓</span> documents processed → chunks embedded
        </p>
        <p>
          <span className="text-green">✓</span> access metadata kept for filtered retrieval
        </p>
      </div>
    </div>
  );
}

function AccessVisual() {
  const docs = [
    { name: 'platform/onboarding.md', allowed: true },
    { name: 'runbooks/payments.md', allowed: true },
    { name: 'security/incident-2025.md', allowed: false },
    { name: 'adr/retry-policy.md', allowed: true },
    { name: 'finance/vendor-terms.pdf', allowed: false },
  ];
  return (
    <div className="flex h-full flex-col gap-4 p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-elev2/70 px-3 py-1 text-xs">
          <User className="h-3.5 w-3.5 text-accent" /> engineer@corp
        </span>
        <span className="rounded-full bg-purple/15 px-2.5 py-1 font-mono text-[11px] text-purple">role: platform-eng</span>
        <ArrowRight className="h-4 w-4 text-t3" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green/15 px-2.5 py-1 text-xs font-medium text-green">
          <ShieldCheck className="h-3.5 w-3.5" /> RBAC filter
        </span>
      </div>
      <ul className="space-y-2">
        {docs.map((d, i) => (
          <motion.li
            key={d.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 font-mono text-[12px] ${
              d.allowed ? 'border-line bg-elev2/70 text-t2' : 'border-dashed border-line text-t3 opacity-60'
            }`}
          >
            {d.allowed ? <FileText className="h-3.5 w-3.5 text-accent" /> : <Lock className="h-3.5 w-3.5" />}
            <span className={`truncate ${d.allowed ? '' : 'line-through'}`}>{d.name}</span>
            <span className={`ml-auto shrink-0 text-[10px] font-sans font-semibold ${d.allowed ? 'text-green' : 'text-pink'}`}>
              {d.allowed ? 'retrieved' : 'filtered'}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function StackVisual() {
  const layers = [
    { label: 'React chat interface', sub: 'natural-language questions', color: 'text-cyan', bg: 'bg-cyan/10' },
    { label: 'Python FastAPI services', sub: 'search APIs + enterprise auth', color: 'text-green', bg: 'bg-green/10' },
    { label: 'LangChain orchestration', sub: 'retrieve → prompt → generate', color: 'text-purple', bg: 'bg-purple/10' },
    { label: 'Azure OpenAI + vector retrieval', sub: 'answers drawn from indexed docs', color: 'text-accent', bg: 'bg-accent/10' },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-5 sm:p-8">
      {layers.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 rounded-2xl border border-line bg-elev2/60 p-3"
          style={{ marginLeft: `${i * 4}%`, marginRight: `${(3 - i) * 4}%` }}
        >
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${l.bg} ${l.color}`}>
            {i === 3 ? <Bot className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{l.label}</p>
            <p className="truncate text-xs text-t3">{l.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const SLIDES: Slide[] = [
  {
    kicker: 'Ask',
    title: 'Plain-language search over technical docs',
    body: 'A React chat interface lets engineers ask questions in natural language and get answers drawn from internal technical documentation.',
    points: ['React chat interface', 'Natural-language questions over docs', 'Signed in with enterprise authentication'],
    visual: <ChatVisual />,
  },
  {
    kicker: 'Ingest',
    title: 'Document processing into vector retrieval',
    body: 'Documentation is processed, chunked and embedded so the assistant can retrieve the most relevant passages for each question.',
    points: ['Document processing pipeline', 'Semantic embeddings', 'Vector retrieval index'],
    visual: <PipelineVisual />,
  },
  {
    kicker: 'Protect',
    title: 'Retrieval that respects access control',
    body: 'Enterprise authentication flows through to retrieval, so people only get answers grounded in documents they are allowed to see.',
    points: ['Enterprise authentication', 'Access-controlled retrieval', 'Role-aware results'],
    visual: <AccessVisual />,
  },
  {
    kicker: 'Answer',
    title: 'FastAPI + LangChain + Azure OpenAI',
    body: 'Python FastAPI services orchestrate retrieval and generation with LangChain and Azure OpenAI, returning answers to the React client.',
    points: ['Python FastAPI services', 'LangChain orchestration', 'Azure OpenAI generation'],
    visual: <StackVisual />,
  },
];

export function Featured() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + SLIDES.length) % SLIDES.length, delta]),
    [],
  );

  // Auto-advance is driven by the active dot's fill animation (pauses on hover/focus).
  // Visitors who prefer reduced motion get a static carousel.
  const autoplay = !useReducedMotion();

  const slide = SLIDES[index];

  return (
    <section id="featured" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="featured"
          title="AI Knowledge Assistant,"
          muted="up close."
          intro="A platform that lets engineers search technical documentation in plain language: a React chat client, Python FastAPI services, and LangChain retrieval over Azure OpenAI, all behind enterprise authentication."
        />

        <Reveal>
          <Spotlight
            className="card overflow-hidden"
            style={{ boxShadow: 'var(--shadow)' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') go(1);
              if (e.key === 'ArrowLeft') go(-1);
            }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured project walkthrough"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <div className="relative min-h-[360px] overflow-hidden border-b border-line bg-gradient-to-br from-accent/[0.07] via-transparent to-purple/[0.07] sm:min-h-[400px] lg:border-b-0 lg:border-r">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={index}
                    custom={dir}
                    initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {slide.visual}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    aria-live="polite"
                  >
                    <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
                      {String(index + 1).padStart(2, '0')} · {slide.kicker}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.7rem] sm:leading-tight">
                      {slide.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-t2">{slide.body}</p>
                    <ul className="mt-5 space-y-2">
                      {slide.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-t2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                  <div className="flex items-center gap-1.5">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.kicker}
                        type="button"
                        aria-label={`Go to slide ${i + 1}: ${s.kicker}`}
                        aria-current={i === index}
                        onClick={() => setState([i, i > index ? 1 : -1])}
                        className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 ${
                          i === index ? 'w-10 bg-[var(--line-strong)]' : 'w-1.5 bg-[var(--text-3)] hover:bg-[var(--text-2)]'
                        }`}
                      >
                        {i === index &&
                          (autoplay ? (
                            <span
                              key={index}
                              onAnimationEnd={() => go(1)}
                              style={{ animationPlayState: paused ? 'paused' : 'running' }}
                              className="absolute inset-y-0 left-0 animate-progress rounded-full bg-gradient-to-r from-accent to-purple"
                            />
                          ) : (
                            <span className="absolute inset-0 rounded-full bg-accent" />
                          ))}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mr-1 font-mono text-xs tabular-nums text-t3">
                      {index + 1} / {SLIDES.length}
                    </span>
                    <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-elev2">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-elev2">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}

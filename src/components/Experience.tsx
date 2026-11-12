import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { useState } from 'react';
import { education, experience } from '../data/resume';
import { duration, formatMonth } from '../lib/dates';
import { tone } from '../lib/tone';
import { Reveal, SectionHeading } from './ui';

export function Experience() {
  const [open, setOpen] = useState<Record<string, boolean>>({ [experience[0].company]: true });

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="experience"
          title="Enterprise software since 2009,"
          muted="from ASP.NET to React Native."
          intro="Financial services and healthcare platforms: web interfaces, mobile apps, backend services and the data behind them."
        />

        <ol className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-accent via-line to-transparent sm:left-[23px]" />
          {experience.map((role, i) => {
            const t = tone(role.color);
            const isOpen = !!open[role.company];
            const panelId = `role-${i}`;
            return (
              <li key={role.company} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 pb-8 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-6">
                <Reveal y={12} className="relative z-10 pt-5">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl border ${t.border} bg-bg text-[11px] font-bold sm:h-12 sm:w-12 sm:text-xs ${t.text}`}
                  >
                    <span className={`grid h-full w-full place-items-center rounded-[11px] ${t.soft}`}>{role.short}</span>
                  </span>
                </Reveal>

                <Reveal delay={0.05}>
                  <article className="card p-5 sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-snug tracking-tight sm:text-xl">{role.title}</h3>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-t2">
                          <span className="inline-flex items-center gap-1.5 font-medium text-t1">
                            <Briefcase className="h-3.5 w-3.5 text-t3" /> {role.company}
                          </span>
                          <span className="inline-flex items-center gap-1 text-t3">
                            <MapPin className="h-3.5 w-3.5" /> {role.location}
                          </span>
                        </p>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p className="font-mono text-sm text-t2">
                          {formatMonth(role.start)} — {formatMonth(role.end)}
                        </p>
                        <p className="text-xs text-t3">{duration(role.start, role.end)}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-line bg-elev2/40 p-4">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${t.text}`}>Product</p>
                      <p className="mt-1 font-semibold">{role.product}</p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-t2">{role.productDescription}</p>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {role.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen((o) => ({ ...o, [role.company]: !isOpen }))}
                      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${t.text} hover:underline`}
                    >
                      {isOpen ? 'Hide role details' : 'View the work behind this role'}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-3 border-t border-line pt-4">
                            {role.bullets.map((b) => (
                              <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-t2">
                                <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${t.bg}`} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </Reveal>
              </li>
            );
          })}

          <li className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-4 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-6">
            <Reveal y={12} className="relative z-10 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-elev text-t2 sm:h-12 sm:w-12">
                <GraduationCap className="h-5 w-5" />
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <article className="card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-t3">Education</p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">{education.degree}</h3>
                  <p className="text-sm text-t2">
                    {education.school} · {education.location}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-sm text-t2">
                  {formatMonth(education.start)} — {formatMonth(education.end)}
                </p>
              </article>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}

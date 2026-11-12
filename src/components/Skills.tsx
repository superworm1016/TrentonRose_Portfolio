import { skills } from '../data/resume';
import { tone } from '../lib/tone';
import { Reveal, SectionHeading } from './ui';

export function Skills() {
  const all = skills.flatMap((s) => s.items);

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="skills"
          title="A full-stack toolkit."
          muted="Tuned for enterprise delivery."
          intro="From the database schema to the iOS screen: the tools I reach for to design, build, secure and ship."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const t = tone(group.color);
            return (
              <Reveal key={group.id} delay={(i % 3) * 0.07} className="h-full">
                <article className="card group relative h-full overflow-hidden p-6 transition-colors hover:bg-elev2/50">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${t.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="flex items-baseline justify-between">
                    <span className={`font-mono text-3xl font-semibold ${t.text}`}>{group.id}</span>
                    <span className="font-mono text-xs text-t3">{group.items.length} tools</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold tracking-tight">{group.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-t2">{group.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Marquee */}
      <div
        aria-hidden="true"
        className="relative mt-16 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm text-t3">
          {[...all, ...all].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Cloud, Database, LayoutTemplate, Server, ShieldCheck, Smartphone, type LucideIcon } from 'lucide-react';
import { skills } from '../data/resume';
import { tone } from '../lib/tone';
import { Reveal, SectionHeading, Spotlight } from './ui';

const ICONS: Record<string, LucideIcon> = {
  '01': Server,
  '02': LayoutTemplate,
  '03': Smartphone,
  '04': Database,
  '05': Cloud,
  '06': ShieldCheck,
};

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex w-max shrink-0 gap-3 pr-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-elev/70 px-4 py-2 font-mono text-[13px] text-t2"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const all = skills.flatMap((s) => s.items);
  const half = Math.ceil(all.length / 2);

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
            const Icon = ICONS[group.id] ?? Server;
            return (
              <Reveal key={group.id} delay={(i % 3) * 0.07} className="h-full">
                <Spotlight as="article" className="card group h-full overflow-hidden p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl border ${t.border} ${t.soft} ${t.text} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
                    >
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-xs text-t3">
                      <span className={t.text}>{group.id}</span> / 06
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight">{group.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-t2">{group.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div aria-hidden="true" className="mt-16 space-y-3">
        <MarqueeRow items={all.slice(0, half)} />
        <MarqueeRow items={all.slice(half)} reverse />
      </div>
    </section>
  );
}

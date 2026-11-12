import { Bot, Check, Clock, FileText, HeartPulse, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import type { ComponentType } from 'react';
import { projects, type Project } from '../data/resume';
import { tone } from '../lib/tone';
import { Reveal, SectionHeading, Spotlight } from './ui';

const VISUAL_TONE: Record<Project['visual'], string> = {
  health: 'green',
  workflow: 'orange',
  assistant: 'accent',
};

function HealthVisual() {
  const rows = [
    { id: '1042', status: 'In clinic', color: 'bg-green/15 text-green' },
    { id: '1043', status: 'Follow-up', color: 'bg-orange/15 text-orange' },
    { id: '1044', status: 'Records sync', color: 'bg-accent/15 text-accent' },
  ];
  return (
    <div className="w-full max-w-[290px] rounded-2xl border border-line bg-bg/80 p-3 shadow-xl">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-semibold">
          <HeartPulse className="h-3.5 w-3.5 text-green" /> Patients
        </p>
        <span className="rounded-md bg-elev2 px-1.5 py-0.5 font-mono text-[9px] text-t3">GET /api/patients</span>
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center gap-2 rounded-lg bg-elev2/70 px-2 py-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-elev text-[8px] font-bold text-t3">P</span>
            <span className="text-[11px] font-medium">Patient #{r.id}</span>
            <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${r.color}`}>{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkflowVisual() {
  const steps = [
    { label: 'Submitted', icon: FileText, done: true },
    { label: 'Manager review', icon: Clock, done: true },
    { label: 'Approved', icon: Check, done: true },
  ];
  return (
    <div className="w-full max-w-[290px] rounded-2xl border border-line bg-bg/80 p-3.5 shadow-xl">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold">
        <Workflow className="h-3.5 w-3.5 text-orange" /> Purchase request
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-elev2 px-1.5 py-0.5 text-[9px] font-medium text-t3">
          <ShieldCheck className="h-2.5 w-2.5" /> role: approver
        </span>
      </p>
      <ol className="flex items-center">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full ${
                  i === steps.length - 1 ? 'bg-green text-white' : 'bg-orange/15 text-orange'
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
              </span>
              <span className="whitespace-nowrap text-[9px] text-t3">{s.label}</span>
            </div>
            {i < steps.length - 1 && <span className="mx-1 mb-4 h-px flex-1 bg-orange/40" />}
          </li>
        ))}
      </ol>
      <p className="mt-3 rounded-lg bg-green/10 px-2 py-1.5 text-[10px] font-medium text-green">Routed automatically by role</p>
    </div>
  );
}

function AssistantVisual() {
  return (
    <div className="w-full max-w-[290px] space-y-2 rounded-2xl border border-line bg-bg/80 p-3 shadow-xl">
      <p className="flex items-center gap-1.5 text-xs font-semibold">
        <Sparkles className="h-3.5 w-3.5 text-accent" /> Docs assistant
      </p>
      <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-accent px-2.5 py-1.5 text-[10.5px] text-white">
        How do I add a new service to the gateway?
      </p>
      <div className="flex max-w-[92%] gap-1.5 rounded-xl rounded-bl-sm bg-elev2/80 px-2.5 py-1.5 text-[10.5px] text-t2">
        <Bot className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
        <span>Register the route in the gateway config, then add its health check…</span>
      </div>
    </div>
  );
}

const VISUALS: Record<Project['visual'], ComponentType> = {
  health: HealthVisual,
  workflow: WorkflowVisual,
  assistant: AssistantVisual,
};

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="projects"
          title="Three platforms,"
          muted="across healthcare, workflow and AI."
          intro="End-to-end builds that pair a modern web front end with secure APIs, relational data and containerized delivery."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {projects.map((p, i) => {
            const t = tone(VISUAL_TONE[p.visual]);
            const Visual = VISUALS[p.visual];
            return (
              <Reveal key={p.name} delay={i * 0.08} className="h-full">
                <Spotlight
                  as="article"
                  className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow)]"
                >
                  <div className={`relative grid h-56 place-items-center overflow-hidden border-b border-line bg-gradient-to-br ${t.glow} px-6`}>
                    <div className="dot-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
                    <div className="relative transition-transform duration-500 group-hover:scale-[1.03]">
                      <Visual />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className={`font-mono text-xs font-medium uppercase tracking-widest ${t.text}`}>
                      {String(i + 1).padStart(2, '0')} · {p.domain}
                    </p>
                    <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight">{p.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-t2">{p.description}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-t2">
                          <Check className={`h-3.5 w-3.5 ${t.text}`} /> {h}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {p.tags.map((tag) => (
                        <li key={tag} className="chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

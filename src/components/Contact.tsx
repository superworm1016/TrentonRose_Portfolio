import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon, Reveal, SectionHeading, Spotlight } from './ui';

type Field = { key: string; value: string; href?: string; external?: boolean };

const FIELDS: Field[] = [
  { key: 'name', value: profile.name },
  { key: 'role', value: profile.title },
  { key: 'email', value: profile.email, href: `mailto:${profile.email}` },
  { key: 'phone', value: profile.phone, href: profile.phoneHref },
  { key: 'linkedin', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { key: 'github', value: `github.com/${profile.githubUser}`, href: profile.github, external: true },
  { key: 'location', value: profile.location },
];

function Row({ icon, label, value, href, external, action }: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  action?: ReactNode;
}) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-elev2 text-t2 transition-colors group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-t3">{label}</span>
        <span className="block truncate font-medium">{value}</span>
      </span>
      {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-t3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </>
  );
  return (
    <li className="flex items-center gap-2">
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-elev2/60"
        >
          {content}
        </a>
      ) : (
        <div className="group flex min-w-0 flex-1 items-center gap-4 p-2">{content}</div>
      )}
      {action}
    </li>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-x-clip py-20 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-r from-accent/15 via-purple/10 to-pink/10 blur-[120px]" />
      </div>
      <div className="container-page">
        <SectionHeading
          label="contact"
          title="Have a role or a project?"
          muted="Let's talk."
          intro="Email is the fastest way to reach me. I'm glad to talk about full stack, mobile, or platform work."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* Code card */}
          <Reveal className="h-full">
            <div
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#1e1e20] text-[#e6e6e6]"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <div className="flex items-center gap-3 border-b border-black/40 bg-[#2a2a2c] px-4 py-2.5">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="font-mono text-xs text-white/60">contact.ts</span>
              </div>
              <pre className="no-scrollbar flex-1 overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
                <code>
                  <span className="tok-kw">export const</span> <span className="tok-type">contact</span> = {'{'}
                  {'\n'}
                  {FIELDS.map((f) => (
                    <span key={f.key}>
                      {'  '}
                      <span className="tok-key">{f.key}</span>:{' '}
                      {f.href ? (
                        <a
                          href={f.href}
                          {...(f.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                          className="tok-str underline decoration-white/20 underline-offset-4 hover:decoration-current"
                        >
                          "{f.value}"
                        </a>
                      ) : (
                        <span className="tok-str">"{f.value}"</span>
                      )}
                      ,{'\n'}
                    </span>
                  ))}
                  {'};'}
                  {'\n\n'}
                  <span className="tok-com">{'// reachable by email, phone or LinkedIn'}</span>
                  {'\n'}
                  <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-[#0a84ff]" />
                </code>
              </pre>
              <div className="flex items-center justify-between gap-3 border-t border-black/40 bg-[#2a2a2c] px-4 py-2 font-mono text-[11px] text-white/45">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" /> ready to send
                </span>
                <span>TypeScript · UTF-8</span>
              </div>
            </div>
          </Reveal>

          {/* Actions */}
          <Reveal delay={0.08}>
            <Spotlight className="card h-full p-4 sm:p-5">
              <ul className="space-y-1">
                <Row
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                  action={
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-t2 hover:bg-elev2 hover:text-t1"
                    >
                      {copied ? <Check className="h-4 w-4 text-green" /> : <Copy className="h-4 w-4" />}
                    </button>
                  }
                />
                <Row icon={<Phone className="h-5 w-5" />} label="Phone" value={profile.phone} href={profile.phoneHref} />
                <Row icon={<LinkedInIcon />} label="LinkedIn" value="trenton-rose" href={profile.linkedin} external />
                <Row icon={<GitHubIcon />} label="GitHub" value={`@${profile.githubUser}`} href={profile.github} external />
                <Row icon={<MapPin className="h-5 w-5" />} label="Location" value={`${profile.location}, United States`} />
              </ul>
              <div className="mt-4 flex flex-wrap gap-3 border-t border-line px-2 pt-5">
                <a href={`mailto:${profile.email}`} className="btn-primary flex-1">
                  <Mail className="h-4 w-4" /> Send an email
                </a>
                <a href={profile.cv} download className="btn-ghost flex-1">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </div>
              <p aria-live="polite" className="sr-only">
                {copied ? 'Email copied to clipboard' : ''}
              </p>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
